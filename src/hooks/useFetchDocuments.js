import { useState, useEffect } from "react";
import db from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;

    setLoading(true);

    const collectionRef = collection(db, docCollection);

    try {
      let q = "";

      if (search) {
        q = query(
          collectionRef,
          where("tags", "array-contains", search),
          orderBy("createdAt", "desc")
        );
      } else {
        q = query(collectionRef, orderBy("createdAt", "desc"));
      }

      onSnapshot(q, (querySnapshot) => {
        setDocuments(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [docCollection, search, uid, cancelled, documents]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
