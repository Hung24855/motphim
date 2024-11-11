import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { CountriesApi } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataCreateCountry, DataUpdateCountry, TResDeleteCountry, TResGetAllCountries } from "../model";

interface ICreateCountryMutation {
    data: DataCreateCountry;
    onSuccess: (data: TResGetAllCountries) => void;
    onError: (e: any) => void;
}

export class CountriesService {
    static queryKey = [QUERY_KEY.GET_ALL_COUNTRIES];

    static useCountries() {
        const queryClient = useQueryClient();
        const { data, refetch } = useFetcher<TResGetAllCountries>([QUERY_KEY.GET_ALL_COUNTRIES], () =>
            CountriesApi.get_all_countries()
        );

        const { mutate: mutateCreate, isPending: isPeddingCreateCountry } = useMutation({
            mutationFn: (data: DataCreateCountry) => CountriesApi.create_country(data)
        });

        const createCountryMutation = ({ data, onError, onSuccess }: ICreateCountryMutation) => {
            mutateCreate(data, { onSuccess: onSuccess, onError: onError });
        };

        const { mutate: updateCountryMutation, isPending: isPeddingUpdateCountry } = useMutation({
            mutationFn: ({ country_id, data }: { country_id: number; data: DataUpdateCountry }) =>
                CountriesApi.update_country({ id: country_id, data }),
            onMutate: ({ data, country_id }) => {
                queryClient.cancelQueries({ queryKey: this.queryKey });
                const previousData = queryClient.getQueryData<TResGetAllCountries>(this.queryKey);

                if (previousData) {
                    queryClient.setQueryData<TResGetAllCountries>(this.queryKey, [
                        ...previousData.map((country) =>
                            country.id === country_id ? data : country
                        )
                    ]);
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<TResGetAllCountries>([QUERY_KEY.GET_ALL_COUNTRIES], context?.previousData);
            }
        });

        const { mutate: deleteCountryMutation, isPending: isPeddingDeleteCountry } = useMutation({
            mutationFn: (id: number) => CountriesApi.delete_country(id),
            onMutate: (id) => {
                queryClient.cancelQueries({ queryKey: this.queryKey });
                const previousData = queryClient.getQueryData<TResDeleteCountry>(this.queryKey);

                if (previousData) {
                    queryClient.setQueryData<TResGetAllCountries>(this.queryKey, [
                        ...previousData.filter((country) => country.id !== id)
                    ]);
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<TResGetAllCountries>([QUERY_KEY.GET_ALL_GENRES], context?.previousData);
            }
        });
        return {
            data,
            refetch,
            createCountryMutation,
            updateCountryMutation,
            deleteCountryMutation,
            isPeddingCreateCountry,
            isPeddingUpdateCountry,
            isPeddingDeleteCountry
        };
    }
}
