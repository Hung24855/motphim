import { useMutation } from "@tanstack/react-query";
import { NotificationApi } from "../api";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { TResGetAllNotification } from "../model";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";

export class NotificationService {
    static useNotification = () => {
        const { isPending, mutate: SaveTokenMutation } = useMutation({
            mutationFn: (token: string) => NotificationApi.save_token({ token })
        });

        return {
            SaveTokenMutation,
            isPending
        };
    };
    static getAllNotification = ({ enabled }: { enabled: boolean }) => {
        const { data: notifications, isFetching } = useFetcher<TResGetAllNotification>(
            [QUERY_KEY.GET_ALL_NOTIFICATIONS],
            () => NotificationApi.get_all_notification(),
            { enabled: enabled }
        );
        return { notifications, isFetching };
    };
}
