import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { DataSaveToken, DataSendNotification } from "../model";

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
}
