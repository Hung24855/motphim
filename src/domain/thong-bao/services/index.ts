import { useMutation } from "@tanstack/react-query";
import { NotificationApi } from "../api";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { DataSendNotification, TResGetAllNotification } from "../model";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";

export class NotificationService {
    static useNotification = () => {
        const { isPending, mutate: SaveTokenMutation } = useMutation({
            mutationFn: (token: string) => NotificationApi.save_token({ token })
        });

        const { mutate: SendNotificationMutation } = useMutation({
            mutationFn: (data: DataSendNotification) => NotificationApi.send_notification(data)
        });

        return {
            SaveTokenMutation,
            SendNotificationMutation,
            isPending
        };
    };
    static getAllNotification = ({ enabled, user_id }: { enabled: boolean; user_id: string }) => {
        const { data: notifications, isFetching } = useFetcher<TResGetAllNotification>(
            [QUERY_KEY.GET_ALL_NOTIFICATIONS, user_id],
            () => NotificationApi.get_all_notification(),
            { enabled: enabled, refetchOnWindowFocus: true,staleTime: 1000 *5 }
        );
        return { notifications, isFetching };
    };
}
