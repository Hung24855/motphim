import { GetAllGenresDTO } from "./../dto/index";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { GenresApi } from "../api";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDataCreateGenres, IDataUpdateGenres } from "../model";

interface ICreateGenreMutation {
    data: IDataCreateGenres;
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

export class GenresService {
    static queryKey = [QUERY_KEY.GET_ALL_GENRES];
    static useGenres() {
        const queryClient = useQueryClient();

        const { data, refetch } = useFetcher<GetAllGenresDTO>(this.queryKey, () => GenresApi.get_all_genres());
        const { mutate: mutateCreate, isPending: isPeddingCreateGenre } = useMutation({
            mutationFn: (data: IDataCreateGenres) => GenresApi.create_genres(data)
        });

        const createEGenreMutation = ({ data, onError, onSuccess }: ICreateGenreMutation) => {
            mutateCreate(data, { onSuccess: onSuccess, onError: onError });
        };

        const { mutate: updateGenreMutation, isPending: isPeddingUpdateGenre } = useMutation({
            mutationFn: ({ genre_id, data }: { genre_id: number; data: IDataUpdateGenres }) =>
                GenresApi.update_genres({ id: genre_id, data }),
            onMutate: ({ data, genre_id }) => {
                queryClient.cancelQueries({ queryKey: this.queryKey });
                const previousData = queryClient.getQueryData<GetAllGenresDTO>(this.queryKey);

                if (previousData) {
                    queryClient.setQueryData<GetAllGenresDTO>(this.queryKey, {
                        ...previousData,
                        data: [
                            ...previousData.data.map((genre) =>
                                genre.id === genre_id ? { ...data, id: genre_id } : genre
                            )
                        ]
                    });
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<GetAllGenresDTO>([QUERY_KEY.GET_ALL_GENRES], context?.previousData);
            }
        });
        return { data, refetch, createEGenreMutation, updateGenreMutation, isPeddingUpdateGenre, isPeddingCreateGenre };
    }
}
