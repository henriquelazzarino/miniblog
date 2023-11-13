import { useState, useEffect, useReducer } from "react";
import db from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UPDATED_DOC":
      return {
        ...state,
        loading: false,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(reducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (uid, data) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      const docRef = doc(db, docCollection, uid);
      const updatedDocument = await updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument, 
      });
    } catch (e) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: e.message,
      });
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { updateDocument, response };
};
