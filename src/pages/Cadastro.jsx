import React from "react";

import { useState, useEffect } from "react";

const Cadastro = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [confirPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (user.password !== confirPassword) {
      setError("As senhas não conferem");
      return;
    }

    console.log(user)
  };

  const label = "flex flex-col mb-4"
  const span = "mb-1.5 font-bold text-left"
  const input = "border-b border-gray-400 py-1 px-2 bg-transparent"

  return (
    <div className="text-center mt-8">
      <h1>Cadastra-se para postar</h1>
      <p className="text-zinc-400 m-3">
        Crie seu usuário e compartilhe suas histórias
      </p>
      <form onSubmit={handleSubmit} className="max-w-[40%] my-0 mx-auto">
        <label className={label}>
          <span className={span}>Nome: </span>
          <input
            type="text"
            name="displayName"
            required  
            placeholder="Nome de usuário"
            value={user.displayName}
            onChange={handleInputChange}
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail"
            value={user.email}
            onChange={handleInputChange}
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>Senha: </span>
          <input
            type="password"
            name="password"
            required
            placeholder="Senha"
            value={user.password}
            onChange={handleInputChange}
            className={input}
          />
        </label>
        <label className={label}>
          <span className={span}>Confirme a senha: </span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            value={confirPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={input}
          />
        </label>
        <button className="btn" type="submit">Cadastrar</button>
        {error && <p className="mt-4 text-red-500 bg-red-400 border border-solid border-red-500 rounded-md p-1.5">{error}</p>}
      </form>
    </div>
  );
};

export default Cadastro;
