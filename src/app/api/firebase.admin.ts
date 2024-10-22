import { initializeApp, getApps, getApp } from "firebase-admin/app";
import admin from "firebase-admin";
import { AccountKey } from "./serviceAccountKey";

export const adminApp = !getApps().length
    ? initializeApp(
          {
              credential: admin.credential.cert({
                  clientEmail: AccountKey.client_email,
                  privateKey: AccountKey.private_key,
                  projectId: AccountKey.project_id
              }),
              databaseURL: "https://themovie-af1e4-default-rtdb.asia-southeast1.firebasedatabase.app"
          },
          "motphim"
      )
    : getApp("motphim");
