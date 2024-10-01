import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import {
    DataCreateCountry,
    DataUpdateCountry,
    TResCreateCountry,
    TResGetAllCountries,
    TResUpdateCountry
} from "../model";
import { requester } from "@/infrastructure/config/request/requester";
import { CreateCountryDTO, GetAllCountriesDTO, UpdateCountryDTO } from "../dto";

export class CountriesApi {
    static async get_all_countries() {
        const get_all = await requester<TResGetAllCountries>({
            requestFunc: () => http.get(ENDPOINT_URL.get_countries()),
            handleData: (data: GetAllCountriesDTO) => data.data
        })();
        return get_all;
    }

    static async create_country(data: DataCreateCountry) {
        const res = await requester<TResCreateCountry>({
            requestFunc: () => http.post(ENDPOINT_URL.create_country(), data),
            handleData: (data: CreateCountryDTO) => data.data
        })();
        return res;
    }

    static async update_country({ data, id }: { data: DataUpdateCountry; id: number }) {
        const res = await requester<TResUpdateCountry>({
            requestFunc: () => http.put(ENDPOINT_URL.update_genre(id), data),
            handleData: (data: UpdateCountryDTO) => data.data
        })();
        return res;
    }
}
