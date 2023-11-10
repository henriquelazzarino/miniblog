import { useState, useEffect, useReducer } from "react";
import db from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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
        case "INSERTED_DOC":
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

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(reducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const insertDocument = async (data) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        });
        try{
            const newDocument = {...data, createdAt: Timestamp.now()};
            const docRef = await addDoc(collection(db, docCollection), newDocument);
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: docRef
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

    return {insertDocument, response};
};