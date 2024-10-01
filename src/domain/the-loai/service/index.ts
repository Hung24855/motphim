import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { GenresApi } from "../api";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataCreateGenres, DataUpdateGenres, TResCreateGenre, TResGetAllGenre } from "../model";
import { GenresDTO } from "../dto";

interface ICreateGenreMutation {
    data: DataCreateGenres;
    onSuccess: (data: TResCreateGenre) => void;
    onError: (e: any) => void;
}

export class GenresService {
    static queryKey = [QUERY_KEY.GET_ALL_GENRES];
    static useGenres() {
        const queryClient = useQueryClient();

        const { data, refetch } = useFetcher<TResGetAllGenre>(this.queryKey, () => GenresApi.get_all_genres());
        const { mutate: mutateCreate, isPending: isPeddingCreateGenre } = useMutation({
            mutationFn: (data: DataCreateGenres) => GenresApi.create_genres(data)
        });

        const createEGenreMutation = ({ data, onError, onSuccess }: ICreateGenreMutation) => {
            mutateCreate(data, { onSuccess: onSuccess, onError: onError });
        };

        const { mutate: updateGenreMutation, isPending: isPeddingUpdateGenre } = useMutation({
            mutationFn: ({ genre_id, data }: { genre_id: number; data: DataUpdateGenres }) =>
                GenresApi.update_genres({ id: genre_id, data }),
            onMutate: ({ data, genre_id }) => {
                queryClient.cancelQueries({ queryKey: this.queryKey });
                const previousData = queryClient.getQueryData<TResGetAllGenre>(this.queryKey);

                if (previousData) {
                    queryClient.setQueryData<TResGetAllGenre>(this.queryKey, [
                        ...previousData.map((genre) => (genre.id === genre_id ? data : genre))
                    ]);
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<TResGetAllGenre>([QUERY_KEY.GET_ALL_GENRES], context?.previousData);
            }
        });
        return { data, refetch, createEGenreMutation, updateGenreMutation, isPeddingUpdateGenre, isPeddingCreateGenre };
    }
}
