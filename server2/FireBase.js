import admin from "firebase-admin";
import { firebaseConfig}  from "./config.js";

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
});

export const db = admin.firestore();
