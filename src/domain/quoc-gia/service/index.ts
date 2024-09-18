import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { GetAllCountriesDTO } from "../dto";
import { CountriesApi } from "../api";
import { useMutation } from "@tanstack/react-query";
import { IDataCreateCountry } from "../model";

interface ICreateCountryMutation {
    data: IDataCreateCountry;
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

export class CountriesService {
    static useCountries() {
        const { data, refetch } = useFetcher<GetAllCountriesDTO>([QUERY_KEY.GET_ALL_COUNTRIES], () =>
            CountriesApi.get_all_countries()
        );

        const { mutate: mutateCreate, isPending: isPeddingCreateCountry } = useMutation({
            mutationFn: (data: IDataCreateCountry) => CountriesApi.create_country(data)
        });

        const createCountryMutation = ({ data, onError, onSuccess }: ICreateCountryMutation) => {
            mutateCreate(data, { onSuccess: onSuccess, onError: onError });
        };
        return { data, refetch, createCountryMutation, isPeddingCreateCountry };
    }
}
