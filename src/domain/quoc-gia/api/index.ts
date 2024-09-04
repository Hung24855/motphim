import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";

export class CountriesApi {
    static async get_all_countries() {
        const res = await http.get(ENDPOINT_URL.get_countries());

        return res.data;
    }
}
