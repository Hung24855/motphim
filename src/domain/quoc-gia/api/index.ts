import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { IDataCreateCountry } from "../model";

export class CountriesApi {
    static async get_all_countries() {
        try {
            const res = await http.get(ENDPOINT_URL.get_countries());
            return res.data;
        } catch (error) {
            console.log("Error: get_all_countries ", error);
        }
    }
    static async create_country(data: IDataCreateCountry) {
        try {
            const { data: res } = await http.post(ENDPOINT_URL.create_country(), data);
            return res;
        } catch (error) {
            console.log("Error: create_country ", error);
        }
    }
}
