import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { TResGetAllAccounts } from "../model";
import { GetAllAccountDTO } from "../dto";

export class AccountsApi {
    static async get_all_accounts() {
        const get_all = await requester<TResGetAllAccounts>({
            requestFunc: () => http.get(ENDPOINT_URL.get_accounts()),
            handleData: (data: GetAllAccountDTO) => data.data
        })();
        return get_all;
    }
}
