import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  databaseURL:
    "https://autoentrepreneur-info-default-rtdb.europe-west1.firebasedatabase.app",
  authDomain: "autoentrepreneur-info.firebaseapp.com",
  projectId: "autoentrepreneur-info",
  storageBucket: "autoentrepreneur-info.appspot.com",
  messagingSenderId: "913601956892",
  appId: "1:913601956892:web:bbce5ce4a8dc2e007163d9",
};

// Vérifier si Firebase a déjà été initialisé
let app: FirebaseApp; // Typage explicite de `app`
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, database, storage };
