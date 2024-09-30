import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";

export class StatisticalApi {
    static async get_statistical() {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_statistical());
            return data;
        } catch (error) {
            console.log("Error: thống kê ", error);
        }
    }
}
