import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { GetAllCountriesDTO } from "../dto";
import { CountriesApi } from "../api";

export class CountriesService {
    static useCountries() {
        const { data } = useFetcher<GetAllCountriesDTO>([QUERY_KEY.GET_ALL_COUNTRIES], () =>
            CountriesApi.get_all_countries()
        );
        return { data };
    }
}
