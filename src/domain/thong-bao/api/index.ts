import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { GetAllNotificationDTO } from "../dto";
import { DataSaveToken, DataSendNotification, TResGetAllNotification } from "../model";

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

    static async get_all_notification({ limit }: { limit: number }) {
        return await requester<TResGetAllNotification>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.get_all_notifications(), {
                    params: { limit }
                }),
            handleData: (data: GetAllNotificationDTO) => data.data
        })();
    }
    static async read_notification() {
        requester({
            requestFunc: () => http.post(ENDPOINT_URL.read_notification())
        })();
    }
}
