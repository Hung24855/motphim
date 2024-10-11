"use client";
import { appFirebase } from "@/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";

//Hứng thông báo khi đang forcus vào app
export default function FireBaseProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const messaging = getMessaging(appFirebase);
        const ubnsub = onMessage(messaging, (payload) => {
            // Lấy thông tin lưu trưc ở đâu đó (back-end hoặc firebase)
            console.log("onMessage", payload);
            
        });
        return () => {
            ubnsub();
        };
    }, []);
    return <div>{children}</div>;
}
