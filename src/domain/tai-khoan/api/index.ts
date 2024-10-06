import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { DataUpdateUser, TResGetAllAccounts, TResGetInfoUser } from "../model";
import { GetAllAccountDTO, GetInfoUserDTO } from "../dto";

export class AccountsApi {
    static async get_all_accounts() {
        const get_all = await requester<TResGetAllAccounts>({
            requestFunc: () => http.get(ENDPOINT_URL.get_accounts()),
            handleData: (data: GetAllAccountDTO) => data.data
        })();
        return get_all;
    }

    static async update_user_info(data: DataUpdateUser) {
        const user_info = await requester<TResGetInfoUser>({
            requestFunc: () => http.put(ENDPOINT_URL.update_user_info(), data),
            handleData: (data: GetInfoUserDTO) => data.data
        })();
        return user_info;
    }
}
