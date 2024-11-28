import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { GetAllAccountDTO, GetInfoUserDTO, VerifyCodeDTO } from "../dto";
import {
    DataChangePassword,
    DataUpdateUser,
    DataVerify,
    TResGetAllAccounts,
    TResGetInfoUser,
    TResVerifyCode
} from "../model";

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

    static async send_email(email: string) {
        return await requester({
            requestFunc: () => http.post(ENDPOINT_URL.send_email(), { email })
        })();
    }
    static async verify_code(data: DataVerify) {
        return await requester<TResVerifyCode>({
            requestFunc: () => http.post(ENDPOINT_URL.verify_code(), data),
            handleData: (data: VerifyCodeDTO) => data.data
        })();
    }
    static async change_password(data: DataChangePassword) {
        return await requester({
            requestFunc: () => http.put(ENDPOINT_URL.change_password(), data)
        })();
    }
}
