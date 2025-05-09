import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { CreateCountryDTO, DeleteCountryDTO, GetAllCountriesDTO, UpdateCountryDTO } from "../dto";
import {
    DataCreateCountry,
    DataUpdateCountry,
    TResCreateCountry,
    TResDeleteCountry,
    TResGetAllCountries,
    TResUpdateCountry
} from "../model";

export class CountriesApi {
    static async get_all_countries() {
        return await requester<TResGetAllCountries>({
            requestFunc: () => http.get(ENDPOINT_URL.get_countries()),
            handleData: (data: GetAllCountriesDTO) => data.data
        })();
    }

    static async create_country(data: DataCreateCountry) {
        return await requester<TResCreateCountry>({
            requestFunc: () => http.post(ENDPOINT_URL.create_country(), data),
            handleData: (data: CreateCountryDTO) => data.data
        })();
    }

    static async update_country({ data, id }: { data: DataUpdateCountry; id: number }) {
        return await requester<TResUpdateCountry>({
            requestFunc: () => http.put(ENDPOINT_URL.update_genre(id), data),
            handleData: (data: UpdateCountryDTO) => data.data
        })();
    }

    static async delete_country(id:number) {
        return await requester<TResDeleteCountry>({
            requestFunc: () => http.delete(ENDPOINT_URL.delete_country(id)),
            handleData: (data: DeleteCountryDTO) => data.data
        })();
    }
}
