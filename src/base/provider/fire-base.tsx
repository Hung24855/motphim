"use client";
import { appFirebase, requestPermission } from "@/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { Fragment, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { sessionContext } from "./next-auth";
import { NotificationService } from "@/domain/thong-bao/services";
import { getDataLocalStorage, removeDataLocalStorage, saveToLocalStorage } from "../utils/function";

//Hứng thông báo khi đang forcus vào app
export default function FireBaseProvider({ children }: { children: React.ReactNode }) {
    const { session } = useContext(sessionContext);

    const { SaveTokenMutation } = NotificationService.useNotification();
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

    useEffect(() => {
        const key = "token_notification";
        const token_notification = getDataLocalStorage(key);
        if (!session) {
            //Đăng xuất hoặc chưa đăng nhập thì xóa token
            if (token_notification) removeDataLocalStorage(key);
            return;
        } //Chưa đăng nhập =>Thoát

        requestPermission({
            onGranted: (currentToken) => {
                if (token_notification) return;

                //Lưu token vào CSDL
                SaveTokenMutation(currentToken, {
                    onSuccess: () => {
                        saveToLocalStorage({ key: key, value: currentToken });
                    }
                });
            },
            onDenied: () => {
                if (token_notification) removeDataLocalStorage(key);
            },
            onDefault: () => {
                if (token_notification) removeDataLocalStorage(key);
            }
        });
    }, [session]);
    return <Fragment>{children}</Fragment>;
}
