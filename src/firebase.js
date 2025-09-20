import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQuI2M1zrw65SfMGfTvEd-PgWW-53oKoE",
  authDomain: "wedding-d3e10.firebaseapp.com",
  projectId: "wedding-d3e10",
  storageBucket: "wedding-d3e10.firebasestorage.app",
  messagingSenderId: "275373531859",
  appId: "1:275373531859:web:506a5d7e7032d582ce2a26",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, auth, db, storage };
