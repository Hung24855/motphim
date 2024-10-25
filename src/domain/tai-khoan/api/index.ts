import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { DataUpdateUser, TResGetAllAccounts, TResGetInfoUser } from "../model";
import { GetAllAccountDTO, GetInfoUserDTO } from "../dto";

export class AccountsApi {
    static async get_all_accounts() {
        return await requester<TResGetAllAccounts>({
            requestFunc: () => http.get(ENDPOINT_URL.get_accounts()),
            handleData: (data: GetAllAccountDTO) => data.data
        })();
    }

    static async update_user_info(data: DataUpdateUser) {
        return await requester<TResGetInfoUser>({
            requestFunc: () => http.put(ENDPOINT_URL.update_user_info(), data),
            handleData: (data: GetInfoUserDTO) => data.data
        })();
    }
}
