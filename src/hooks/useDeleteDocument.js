import { useState, useEffect, useReducer } from "react";
import db from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: false,
    error: null
};

const reducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true
            };
        case "DELETED_DOC":
            return {
                ...state,
                loading: false,
                error: null
            };
        case "ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const useDeleteDocument = (docCollection) => {
    const [response, dispatch] = useReducer(reducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        });
        try{
            const deletedDocument = await deleteDoc(doc(db, docCollection, id));
            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument
            });
        } catch(e) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: e.message
            });
        }
    };

    useEffect(() => {
        return () => {
            setCancelled(true);
        };
    }, []);

    return {deleteDocument, response};
};