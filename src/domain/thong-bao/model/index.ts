import { NotificationDTO } from "../dto";

export interface DataSaveToken {
    token: string;
}

export interface DataSendNotification {
    movie_id: string;
}

export type TResGetAllNotification = NotificationDTO[];
