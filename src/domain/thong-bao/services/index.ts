import { useMutation } from "@tanstack/react-query";
import { NotificationApi } from "../api";

export class NotificationService {
    static useNotification = () => {
        const { isPending, mutate: SaveTokenMutation } = useMutation({
            mutationFn: (token: string) => NotificationApi.save_token(token)
        });

        return {
            SaveTokenMutation,
            isPending
        };
    };
}
