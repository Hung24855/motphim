import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationApi } from "../api";
import { DataSendNotification, TResGetAllNotification } from "../model";

export class NotificationService {
    static useNotification = ({ user_id = "" }: { user_id?: string }) => {
        const queryClient = useQueryClient();
        const { isPending, mutate: SaveTokenMutation } = useMutation({
            mutationFn: (token: string) => NotificationApi.save_token({ token })
        });

        const { mutate: SendNotificationMutation } = useMutation({
            mutationFn: (data: DataSendNotification) => NotificationApi.send_notification(data)
        });
        const { mutate: ReadNotificationMutation } = useMutation({
            mutationFn: () => NotificationApi.read_notification(),
            onMutate() {
                const queryKey = [QUERY_KEY.GET_ALL_NOTIFICATIONS, user_id];
                queryClient.setQueryData<TResGetAllNotification>(queryKey, (notifications) =>
                    notifications?.map((notification) => ({
                        ...notification,
                        is_read: true
                    }))
                );
            }
        });

        return {
            SaveTokenMutation,
            SendNotificationMutation,
            ReadNotificationMutation,
            isPending
        };
    };
    static getAllNotification = ({
        enabled,
        user_id,
        limit = 20
    }: {
        enabled: boolean;
        user_id: string;
        limit?: number;
    }) => {
        const { data: notifications, isFetching } = useFetcher<TResGetAllNotification>(
            [QUERY_KEY.GET_ALL_NOTIFICATIONS, user_id],
            () => NotificationApi.get_all_notification({ limit }),
            { enabled: enabled, refetchOnWindowFocus: true, staleTime: 1000 * 5 }
        );
        return { notifications, isFetching };
    };
}
