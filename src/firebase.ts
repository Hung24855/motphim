import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, MessagePayload, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY_FIRE_BASE,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_FIRE_BASE,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_FIRE_BASE,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID_FIRE_BASE,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_FIRE_BASE,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_FIRE_BASE,
    appId: process.env.NEXT_PUBLIC_APP_ID_FIRE_BASE,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_FIRE_BASE
};
// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const authFirebase = getAuth(appFirebase);
export const dbFirebase = getFirestore(appFirebase); //Lưu trữ tin nhắn real-time
export const storageFirebase = getStorage(appFirebase); //Lưu trữ hình ảnh

// export const onMessageListener = (): Promise<MessagePayload> => {
//     const messaging = getMessaging(appFirebase);
//     //Lắng nghe dữ liệu trả về từ thông báo
//     return new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         });
//     });
// };

// const messaging = getMessaging(appFirebase); //Hàm này sẽ tự chạy để kiểm tra quyền thông báo của trình duyệt! Vậy chỉ nên gọi hàm này nếu quyền thông báo được bật

export const requestPermission = ({
    onGranted,
    onDefault = () => {},
    onDenied = () => {}
}: {
    onGranted: (currentToken: string) => void;
    onDenied?: () => void;
    onDefault?: () => void;
}) => {
    Notification.requestPermission().then((permistion) => {
        switch (permistion) {
            case "granted":
                const messaging = getMessaging(appFirebase);
                getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_FCM_KEY_FIRE_BASE
                })
                    .then((currentToken) => {
                        if (currentToken) {
                            onGranted(currentToken);
                        } else {
                        }
                    })
                    .catch((err) => {});
                break;
            case "denied":
                onDenied();
                break;
            case "default":
                onDefault();
                break;
        }
    });
};
