import { initializeApp, getApps, getApp } from "firebase-admin/app";
import serviceAccountKey from "./serviceAccountKey.json";
import admin from "firebase-admin";

export const adminApp = !getApps().length
    ? initializeApp(
          {
              credential: admin.credential.cert({
                  clientEmail: serviceAccountKey.client_email,
                  privateKey: serviceAccountKey.private_key,
                  projectId: serviceAccountKey.project_id
              }),
              databaseURL: "https://themovie-af1e4-default-rtdb.asia-southeast1.firebasedatabase.app"
          },
          "motphim"
      )
    : getApp("motphim");
