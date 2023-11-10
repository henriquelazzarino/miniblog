import { useState, useEffect } from "react";
import db from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocuments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;
    setLoading(true);
    try {
      const docRef = doc(db, docCollection, id);
      getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          setDocuments(doc.data());
        } else {
          setError("Post não encontrado");
        }
      });
    } catch (e) {
      console.log(e)
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [docCollection, id]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
};
