import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBx4O-qbAKZQldiOjm2beil6L3gxftFWlQ",
  authDomain: "juristo.firebaseapp.com",
  projectId: "juristo",
  storageBucket: "juristo.appspot.com",
  messagingSenderId: "500246453376",
  appId: "1:500246453376:web:87d99f821f9b37248eda65",
};

let app;
try {
  app = getApp();
} catch (error) {
  app = initializeApp(firebaseConfig);
}
const auth = getAuth(app);
const storage = getStorage();
let firestore;

try {
  firestore = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  }); // <= settings
} catch (e) {
  if (e.code === "failed-precondition") {
    // Multiple app instances detected
    console.log(e);
    firestore = getFirestore(app);
  } else {
    throw e;
  }
}

export { app, firestore, auth, storage };
