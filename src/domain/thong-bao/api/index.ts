import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { DataSaveToken, DataSendNotification, TResGetAllNotification } from "../model";
import { GetAllNotificationDTO } from "../dto";

export class NotificationApi {
    static async save_token(data: DataSaveToken) {
        requester({
            requestFunc: () => http.post(ENDPOINT_URL.save_token(), data)
        })();
    }
    static async send_notification(data: DataSendNotification) {
        requester({
            requestFunc: () => http.post(ENDPOINT_URL.send_notification(), data)
        })();
    }

    static async get_all_notification() {
        const res = await requester<TResGetAllNotification>({
            requestFunc: () => http.get(ENDPOINT_URL.get_all_notifications()),
            handleData: (data: GetAllNotificationDTO) => data.data
        })();
        return res;
    }

   
}
