import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { MoviesApi } from "../api";
import { DataGetMovieDetailDTO, DataGetMoviesDTO } from "../dto";
import { useMutation } from "@tanstack/react-query";
import { IDataCreateMovieType } from "../model";

interface ICreateMovieMutation {
    data: IDataCreateMovieType;
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

export class MoviesService {
    static get_movie(slug: string) {
        const { data } = useFetcher<DataGetMovieDetailDTO>([QUERY_KEY.GET_MOVIE_DETAIL, slug], () =>
            MoviesApi.get_movie(slug)
        );
        return { data };
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
        const { mutate,isPending:isPeddingCreateMovie } = useMutation({
            mutationFn: (data: IDataCreateMovieType) => MoviesApi.create_movie(data)
        });

        const createMovieMutation = ({ data, onError, onSuccess }: ICreateMovieMutation) => {
            mutate(data, { onSuccess: onSuccess, onError: onError });
        };

        return { data, createMovieMutation,isPeddingCreateMovie };
    }
}
