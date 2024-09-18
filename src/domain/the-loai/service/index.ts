import { GetAllGenresDTO } from "./../dto/index";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { GenresApi } from "../api";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useMutation } from "@tanstack/react-query";
import { IDataCreateGenres } from "../model";

interface ICreateGenreMutation {
    data: IDataCreateGenres;
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

export class GenresService {
    static useGenres() {
        const { data, refetch } = useFetcher<GetAllGenresDTO>([QUERY_KEY.GET_ALL_GENRES], () =>
            GenresApi.get_all_genres()
        );
        const { mutate: mutateCreate, isPending: isPeddingCreateGenre } = useMutation({
            mutationFn: (data: IDataCreateGenres) => GenresApi.create_genres(data)
        });

        const createEGenreMutation = ({ data, onError, onSuccess }: ICreateGenreMutation) => {
            mutateCreate(data, { onSuccess: onSuccess, onError: onError });
        };
        return { data, refetch, createEGenreMutation, isPeddingCreateGenre };
    }
}
