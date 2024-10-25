import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { TResGetStatistical } from "../model";
import { GetStatisticalDTO } from "../dto";

export class StatisticalApi {
    static async get_statistical() {
        return await requester<TResGetStatistical>({
            requestFunc: () => http.get(ENDPOINT_URL.get_statistical()),
            handleData: (data: GetStatisticalDTO) => data.data
        })();
    }
}
