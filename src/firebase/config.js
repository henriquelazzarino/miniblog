import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlKKi8yTLYTlSFJzt8YvMJR_YNVLeAULE",
  authDomain: "miniblog-46074.firebaseapp.com",
  projectId: "miniblog-46074",
  storageBucket: "miniblog-46074.appspot.com",
  messagingSenderId: "148209578936",
  appId: "1:148209578936:web:dc513079ddc36ac3f1554d",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
