import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { TResGetAllAccounts } from "../model";
import { AccountsApi } from "../api";

export class AccountsService {
    static queryKey = [QUERY_KEY.GET_ACCOUNTS];

    static useAccounts() {
        const { data, refetch } = useFetcher<TResGetAllAccounts>(this.queryKey, () => AccountsApi.get_all_accounts());

        return {
            data,
            refetch
        };
    }
}
