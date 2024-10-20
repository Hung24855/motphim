"use client";
import { appFirebase, requestPermission } from "@/firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import { Fragment, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { sessionContext } from "./next-auth";
import { NotificationService } from "@/domain/thong-bao/services";
import { getDataLocalStorage, removeDataLocalStorage, saveToLocalStorage } from "../base/utils/function";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { TResGetAllNotification } from "@/domain/thong-bao/model";
import { NotificationDTO } from "@/domain/thong-bao/dto";

//Hứng thông báo khi đang forcus vào app
export default function FireBaseProvider({ children }: { children: React.ReactNode }) {
    const { session } = useContext(sessionContext);
    const queryClient = useQueryClient();

    const { SaveTokenMutation } = NotificationService.useNotification();

    //Hứng thông báo và thêm vào danh sách
    useEffect(() => {
        if (!session) return;
        const messaging = getMessaging(appFirebase);
        const ubnsub = onMessage(messaging, (payload) => {
            const queryKey = [QUERY_KEY.GET_ALL_NOTIFICATIONS, session.user.id];
            const newNotification: NotificationDTO = {
                created_at: Date.now(),
                id: Math.random() * 1000,
                image: payload?.data?.image ?? "",
                slug: payload?.data?.slug ?? "",
                title: payload.notification?.body ?? ""
            };

            const previousData = queryClient.getQueryData<TResGetAllNotification>(queryKey);
            if (previousData) {
                queryClient.setQueryData<TResGetAllNotification>(queryKey, [newNotification, ...previousData]);
            }

            toast.info(payload.notification?.body, {
                position: "bottom-right",
                hideProgressBar: true
            });
        });
        return () => {
            ubnsub();
        };
    }, [session]);

    //Xin cấp quyền thông báo
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
                if (token_notification && currentToken === token_notification) return;

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
