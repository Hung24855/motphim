"use client";
import { appFirebase } from "@/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { Fragment, useEffect } from "react";
import { toast } from "react-toastify";

//Hứng thông báo khi đang forcus vào app
export default function FireBaseProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const messaging = getMessaging(appFirebase);
        const ubnsub = onMessage(messaging, (payload) => {
            // Lấy thông tin lưu vào đâu đó (back-end hoặc firebase)

            toast.info(payload.notification?.body);
        });
        return () => {
            ubnsub();
        };
    }, []);
    return <Fragment>{children}</Fragment>;
}
