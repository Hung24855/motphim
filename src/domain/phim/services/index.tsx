import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { MoviesApi } from "../api";
import { DataGetMovieDetailDTO, DataGetMoviesDTO } from "../dto";
import { useMutation } from "@tanstack/react-query";
import { IDataCreateMovieType, IDataUpdateMovieType } from "../model";

interface ICreateMovieMutation {
    data: IDataCreateMovieType;
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

interface IUpdateMovieMutation {
    data: {
        id: string;
        data: IDataUpdateMovieType;
    };
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

interface IDeleteMovieMutation {
    id: string;
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

export class MoviesService {
    static get_movie(slug: string) {
        const { data, isFetching, isError, refetch } = useFetcher<DataGetMovieDetailDTO>(
            [QUERY_KEY.GET_MOVIE_DETAIL, slug],
            () => MoviesApi.get_movie(slug)
        );
        return { data, isFetching, isError, refetch };
    }

    static get_movies_by_genre(slug: string) {
        const { data } = useFetcher<DataGetMoviesDTO>([QUERY_KEY.GET_MOVIE_BY_GENRE, slug], () =>
            MoviesApi.get_movies_by_genre(slug)
        );
        return { data };
    }

    static get_movies_by_type(slug: "phim-bo" | "phim-le") {
        const { data } = useFetcher<DataGetMoviesDTO>([QUERY_KEY.GET_MOVIE_BY_TYPE, slug], () =>
            MoviesApi.get_movies_by_type(slug)
        );
        return { data };
    }

    static use_movies() {
        const { data } = useFetcher<DataGetMoviesDTO>([QUERY_KEY.GET_LIST_MOVIES], () => MoviesApi.get_movies());
        const { mutate: mutateCreate, isPending: isPeddingCreateMovie } = useMutation({
            mutationFn: (data: IDataCreateMovieType) => MoviesApi.create_movie(data)
        });

        const { mutate: mutateUpdate, isPending: isPeddingUpdateMovie } = useMutation({
            mutationFn: (data: { data: IDataUpdateMovieType; id: string }) =>
                MoviesApi.update_movie({ data: data.data, id: data.id })
        });
        const { mutate: mutateDelete, isPending: isPeddingDeleteMovie } = useMutation({
            mutationFn: (id: string) => MoviesApi.delete_movie(id)
        });

        const createMovieMutation = ({ data, onError, onSuccess }: ICreateMovieMutation) => {
            mutateCreate(data, { onSuccess: onSuccess, onError: onError });
        };

        const updateMovieMutation = ({ data, onError, onSuccess }: IUpdateMovieMutation) => {
            mutateUpdate(data, { onSuccess: onSuccess, onError: onError });
        };
        const deleteMovieMutation = ({ id, onError, onSuccess }: IDeleteMovieMutation) => {
            mutateDelete(id, { onSuccess: onSuccess, onError: onError });
        };

        return {
            data,
            createMovieMutation,
            updateMovieMutation,
            deleteMovieMutation,
            isPeddingCreateMovie,
            isPeddingUpdateMovie,
            isPeddingDeleteMovie
        };
    }
}
