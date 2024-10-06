import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { DataUpdateUser, TResGetAllAccounts } from "../model";
import { AccountsApi } from "../api";
import { useMutation } from "@tanstack/react-query";

export class AccountsService {
    static queryKey = [QUERY_KEY.GET_ACCOUNTS];

    static update_user_info() {
        const { mutate: UpdateUserMutation, isPending } = useMutation({
            mutationFn: (data: DataUpdateUser) => AccountsApi.update_user_info(data)
        });
        return {
            UpdateUserMutation,
            isPending
        };
    }

    static useAccounts() {
        const { data, refetch } = useFetcher<TResGetAllAccounts>(this.queryKey, () => AccountsApi.get_all_accounts());

        return {
            data,
            refetch
        };
    }
}
