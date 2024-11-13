import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { DataChangePassword, DataUpdateUser, DataVerify, TResGetAllAccounts } from "../model";
import { AccountsApi } from "../api";
import { useMutation } from "@tanstack/react-query";

export class AccountsService {
    static queryKey = [QUERY_KEY.GET_ACCOUNTS];
    static get_list_account() {
        const { data, refetch } = useFetcher<TResGetAllAccounts>(this.queryKey, () => AccountsApi.get_all_accounts());
        return {
            data,
            refetch
        };
    }

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
        const { mutate: SendEmailMutation, isPending: isPendingSendEmail } = useMutation({
            mutationFn: (email: string) => AccountsApi.send_email(email)
        });
        const { mutate: VerifyCodeMutation, isPending: isPendingVerify } = useMutation({
            mutationFn: (data: DataVerify) => AccountsApi.verify_code(data)
        });
        const { mutate: ChangePasswordMutation, isPending: isPendingChangePassword } = useMutation({
            mutationFn: (data: DataChangePassword) => AccountsApi.change_password(data)
        });
        return {
            SendEmailMutation,
            VerifyCodeMutation,
            ChangePasswordMutation,
            isPendingSendEmail,
            isPendingVerify,
            isPendingChangePassword
        };
    }
}
