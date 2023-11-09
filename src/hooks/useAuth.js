import db from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const checkIfCancelled = () => {
    if (cancelled) return;
  };

  const createUser = async (data) => {
    checkIfCancelled();
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });
    } catch (e) {
      let message = "";

      switch (e.code) {
        case "auth/email-already-in-use":
          message = "E-mail já cadastrado.";
          break;
        case "auth/invalid-email":
          message = "E-mail inválido.";
          break;
        case "auth/weak-password":
          message = "Senha muito fraca.";
          break;
        default:
          message = "Erro desconhecido.";
          break;
      }

      setError(message);
    }
    setLoading(false);
  };

  const logout = () => {
    checkIfCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfCancelled();
    setLoading(true);
    setError(null);
    console.log("D",data)
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (e) {
      let message = "";

      switch (e.code) {
        case "auth/invalid-email":
          message = "E-mail inválido.";
          break;
        case "auth/user-disabled":
          message = "Usuário desabilitado.";
          break;
        case "auth/user-not-found":
          message = "Usuário não encontrado.";
          break;
        case "auth/wrong-password":
          message = "Senha incorreta.";
          break;
        case "auth/invalid-login-credentials":
          message = "Credenciais inválidas.";
          break;
        default:
          message = "Erro desconhecido.";
          break;
      }

      console.error(e);

      setError(message);
    }
    setLoading(false);
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    error,
    loading,
    createUser,
    logout,
    login,
  }
};
