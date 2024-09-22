import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { MoviesApi } from "../api";
import {
    DataGetMovieDetailDTO,
    DataGetMoviesByCountryDTO,
    DataGetMoviesByGenreDTO,
    DataGetMoviesDTO,
    DataSearchMovieDTO
} from "../dto";
import { useMutation } from "@tanstack/react-query";
import {
    IDataCreateEpisodeType,
    IDataCreateMovieType,
    IDataGetAllMoviesByCountry,
    IDataGetAllMoviesByGenre,
    IDataGetAllMoviesByType,
    IDataGetAllMoviesType,
    IDataUpdateEpisodeType,
    IDataUpdateMovieType
} from "../model";

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

interface IDeleteEpisodeMutation {
    episode_id: string;
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

interface ICreateEpisodeMutation {
    data: {
        movie_id: string;
        data: IDataCreateEpisodeType;
    };
    onSuccess: (data: any) => void;
    onError: (e: any) => void;
}

interface IUpdateEpisodeMutation {
    data: {
        episode_id: string;
        data: IDataUpdateEpisodeType;
    };
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

    static get_movies_by_genre({ slug, page, limit }: IDataGetAllMoviesByGenre) {
        const { data } = useFetcher<DataGetMoviesByGenreDTO>([QUERY_KEY.GET_MOVIE_BY_GENRE, slug, page], () =>
            MoviesApi.get_movies_by_genre({ slug, page, limit })
        );
        return { data };
    }
    static get_movies_by_country({ slug, page, limit }: IDataGetAllMoviesByCountry) {
        const { data } = useFetcher<DataGetMoviesByCountryDTO>([QUERY_KEY.GET_MOVIE_BY_COUNTRY, slug, page], () =>
            MoviesApi.get_movies_by_country({ slug, page, limit })
        );
        return { data };
    }

    static get_movies_by_type({ slug, page, limit }: IDataGetAllMoviesByType) {
        console.log("slug, page, limit", slug, page, limit);

        const { data } = useFetcher<DataGetMoviesDTO>([QUERY_KEY.GET_MOVIE_BY_TYPE, slug, page], () =>
            MoviesApi.get_movies_by_type({ slug, page, limit })
        );
        return { data };
    }

    static use_movies({ page, limit }: IDataGetAllMoviesType) {
        const { data, isFetching } = useFetcher<DataGetMoviesDTO>([QUERY_KEY.GET_LIST_MOVIES, page], () =>
            MoviesApi.get_movies({ page, limit })
        );
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
            isFetching,
            createMovieMutation,
            updateMovieMutation,
            deleteMovieMutation,
            isPeddingCreateMovie,
            isPeddingUpdateMovie,
            isPeddingDeleteMovie
        };
    }

    static use_episodes() {
        const { mutate: mutateDelete, isPending: isPeddingDeleteEpisode } = useMutation({
            mutationFn: (episode_id: string) => MoviesApi.delete_episode(episode_id)
        });

        const deleteEpisodeMutation = ({ episode_id, onError, onSuccess }: IDeleteEpisodeMutation) => {
            mutateDelete(episode_id, { onSuccess: onSuccess, onError: onError });
        };

        const { mutate: mutateCreate, isPending: isPeddingCreateEpisode } = useMutation({
            mutationFn: ({ movie_id, data }: { movie_id: string; data: IDataCreateEpisodeType }) =>
                MoviesApi.create_episodes({
                    movie_id,
                    data
                })
        });

        const createEpisodeMutation = ({ data, onError, onSuccess }: ICreateEpisodeMutation) => {
            mutateCreate(data, { onSuccess: onSuccess, onError: onError });
        };

        const { mutate: mutateUpdate, isPending: isPeddingUpdateEpisode } = useMutation({
            mutationFn: ({ episode_id, data }: { episode_id: string; data: IDataUpdateEpisodeType }) =>
                MoviesApi.update_episode({
                    episode_id,
                    data
                })
        });
        const updateEpisodeMutation = ({ data, onError, onSuccess }: IUpdateEpisodeMutation) => {
            mutateUpdate(data, { onSuccess: onSuccess, onError: onError });
        };

        return {
            deleteEpisodeMutation,
            createEpisodeMutation,
            updateEpisodeMutation,
            isPeddingDeleteEpisode,
            isPeddingCreateEpisode,
            isPeddingUpdateEpisode
        };
    }

    // Tim kiem phim

    static get_search_movie(query: string) {
        const { data, isFetching, isError, refetch } = useFetcher<DataSearchMovieDTO>(
            [QUERY_KEY.GET_SEARCH_MOVIE, query],
            () => MoviesApi.search_movie(query)
        );
        return { data, isFetching, isError, refetch };
    }
}
