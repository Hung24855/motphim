import { ISuccessResponse } from "@/infrastructure/config/types/apiResponse";

export interface NotificationDTO {
    id: number;
    title: string;
    created_at: string | number;
    slug: string;
    image: string;
    is_read: boolean;
}

export type GetAllNotificationDTO = ISuccessResponse<NotificationDTO[]>;
