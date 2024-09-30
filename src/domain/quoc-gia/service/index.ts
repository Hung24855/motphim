import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { GetAllCountriesDTO } from "../dto";
import { CountriesApi } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDataCreateCountry, IDataUpdateCountry } from "../model";

interface ICreateCountryMutation {
    data: IDataCreateCountry;
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

export class CountriesService {
    static queryKey = [QUERY_KEY.GET_ALL_COUNTRIES];

    static useCountries() {
        const queryClient = useQueryClient();
        const { data, refetch } = useFetcher<GetAllCountriesDTO>([QUERY_KEY.GET_ALL_COUNTRIES], () =>
            CountriesApi.get_all_countries()
        );

        const { mutate: mutateCreate, isPending: isPeddingCreateCountry } = useMutation({
            mutationFn: (data: IDataCreateCountry) => CountriesApi.create_country(data)
        });

        const createCountryMutation = ({ data, onError, onSuccess }: ICreateCountryMutation) => {
            mutateCreate(data, { onSuccess: onSuccess, onError: onError });
        };

        const { mutate: updateCountryMutation, isPending: isPeddingUpdateCountry } = useMutation({
            mutationFn: ({ country_id, data }: { country_id: number; data: IDataUpdateCountry }) =>
                CountriesApi.update_country({ id: country_id, data }),
            onMutate: ({ data, country_id }) => {
                queryClient.cancelQueries({ queryKey: this.queryKey });
                const previousData = queryClient.getQueryData<GetAllCountriesDTO>(this.queryKey);

                if (previousData) {
                    queryClient.setQueryData<GetAllCountriesDTO>(this.queryKey, {
                        ...previousData,
                        data: [
                            ...previousData.data.map((country) =>
                                country.id === country_id ? { ...data, id: country_id } : country
                            )
                        ]
                    });
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<GetAllCountriesDTO>([QUERY_KEY.GET_ALL_COUNTRIES], context?.previousData);
            }
        });
        return {
            data,
            refetch,
            createCountryMutation,
            updateCountryMutation,
            isPeddingCreateCountry,
            isPeddingUpdateCountry
        };
    }
}
