import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { MoviesApi } from "../api";
import {
    DataCheckFavoriteMovieDTO,
    DataGetFeaturedMoviesDTO,
    DataGetMovieDetailDTO,
    DataGetMoviesByCountryDTO,
    DataGetMoviesByGenreDTO,
    DataGetMoviesDTO,
    DataGetMoviesFavoriteDTO,
    DataSearchMovieDTO,
    MovieForCardDTO
} from "../dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    IDataCreateEpisodeType,
    IDataCreateMovieType,
    IDataGetAllMoviesByCountry,
    IDataGetAllMoviesByGenre,
    IDataGetAllMoviesByType,
    IDataGetAllMoviesType,
    IDataGetFavoriteMovies,
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
interface IChangeVisibleMovieMutation {
    data: {
        movie_id: string;
        is_visible: boolean;
    };
    onSuccess: (data: { status: string; message: string }) => void;
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

    static get_movies_by_genre({ slug, page = 1, limit }: IDataGetAllMoviesByGenre) {
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
        // console.log("slug, page, limit", slug, page, limit);

        const { data } = useFetcher<DataGetMoviesDTO>([QUERY_KEY.GET_MOVIE_BY_TYPE, slug, page], () =>
            MoviesApi.get_movies_by_type({ slug, page, limit })
        );
        return { data };
    }

    // CRUD phim
    static use_movies({ page, limit }: IDataGetAllMoviesType) {
        const {
            data,
            isFetching,
            refetch: refetchMovies
        } = useFetcher<DataGetMoviesDTO>([QUERY_KEY.GET_LIST_MOVIES, page], () =>
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
            refetchMovies,
            createMovieMutation,
            updateMovieMutation,
            deleteMovieMutation,
            isPeddingCreateMovie,
            isPeddingUpdateMovie,
            isPeddingDeleteMovie
        };
    }
    // Quản lý tập phim
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
    // Ẩn hiện phim
    static change_visible_movie() {
        const { mutate, isPending: isPendingChangeVisibleMovie } = useMutation({
            mutationFn: ({ movie_id, is_visible }: { movie_id: string; is_visible: boolean }) =>
                MoviesApi.change_visible_movie({ movie_id, is_visible })
        });

        const mutateChangeVisibleMovie = ({ data, onError, onSuccess }: IChangeVisibleMovieMutation) => {
            mutate(data, { onSuccess: onSuccess, onError: onError });
        };
        return { mutateChangeVisibleMovie, isPendingChangeVisibleMovie };
    }
    // Get đanh sách phim yêu thích
    static use_favorite_movie({ user_id }: IDataGetFavoriteMovies) {
        const {
            data: moviesFavoriteByUser,
            isFetching: isFetchingMoviesFavorite,
            refetch: refetchMoviesFavorite
        } = useFetcher<DataGetMoviesFavoriteDTO>(
            [QUERY_KEY.GET_FAVORITE_MOVIES],
            () => MoviesApi.get_favorite_movies(user_id),
            {
                enabled: !!user_id
            }
        );

        return {
            moviesFavoriteByUser,
            isFetchingMoviesFavorite,
            refetchMoviesFavorite
        };
    }

    //Yêu thích và bỏ yêu thích phim
    static use_favorite_action() {
        const queryClient = useQueryClient();

        // Optimistic Updates
        const { mutate: mutateFavoriteMovie } = useMutation({
            mutationFn: ({ user_id, movie }: { user_id: string; movie: MovieForCardDTO }) =>
                MoviesApi.favorite_movie({
                    user_id,
                    movie_id: movie.id
                }),
            onMutate: async ({ movie, user_id }) => {
                if (!user_id) {
                    return;
                }

                const queryKey = [QUERY_KEY.GET_FAVORITE_MOVIES];
                await queryClient.cancelQueries({ queryKey });

                const previousData = queryClient.getQueryData<DataGetMoviesFavoriteDTO>(queryKey);
                if (previousData) {
                    queryClient.setQueryData<DataGetMoviesFavoriteDTO>(queryKey, {
                        status: "success",
                        message: "Lấy danh sách sản phẩm thành công!",
                        data: [...previousData.data, movie]
                    });
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<DataGetMoviesFavoriteDTO>(
                    [QUERY_KEY.GET_FAVORITE_MOVIES],
                    context?.previousData
                );
            }
            // onSettled(_, __) {
            //     queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_FAVORITE_MOVIES] });
            // }
        });

        const { mutate: mutateUnFavoriteMovie } = useMutation({
            mutationFn: ({ user_id, movie_id }: { user_id: string; movie_id: string }) =>
                MoviesApi.unfavorite_movie({
                    user_id,
                    movie_id
                }),
            onMutate: async ({ user_id, movie_id }) => {
                if (!user_id) {
                    return;
                }

                const queryKey = [QUERY_KEY.GET_FAVORITE_MOVIES];
                await queryClient.cancelQueries({ queryKey });

                const previousData = queryClient.getQueryData<DataGetMoviesFavoriteDTO>(queryKey);
                if (previousData) {
                    queryClient.setQueryData<DataGetMoviesFavoriteDTO>(queryKey, {
                        status: "success",
                        message: "Lấy danh sách sản phẩm thành công!",
                        data: [...previousData.data.filter((movie) => movie.id !== movie_id)]
                    });
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<DataGetMoviesFavoriteDTO>(
                    [QUERY_KEY.GET_FAVORITE_MOVIES],
                    context?.previousData
                );
            }
        });

        return {
            mutateFavoriteMovie,
            mutateUnFavoriteMovie
        };
    }
    // Check phim yêu thích hay chưa
    static check_favorite_movie({ movie_id, user_id }: { movie_id: string; user_id: string }) {
        const {
            data: checkFavoriteMovie,
            isFetching: isFetchingCheckFavoriteMovie,
            refetch: refetchCheckFavoriteMovie
        } = useFetcher<DataCheckFavoriteMovieDTO>(
            [QUERY_KEY.GET_CHECK_FAVORITE_MOVIE, movie_id],
            () => MoviesApi.check_favorite_movie(movie_id),
            { enabled: !!user_id && !!movie_id }
        );
        return {
            checkFavoriteMovie,
            isFetchingCheckFavoriteMovie,
            refetchCheckFavoriteMovie
        };
    }

    // Danh sách phim có views nhiều nhất
    static get_featured_movies() {
        const { data: featuredMovies, isFetching: isFetchingFeaturedMovies } = useFetcher<DataGetFeaturedMoviesDTO>(
            [QUERY_KEY.GET_LIST_FEATURED_MOVIES],
            () => MoviesApi.get_featured_movies()
        );
        return {
            featuredMovies,
            isFetchingFeaturedMovies
        };
    }
}
