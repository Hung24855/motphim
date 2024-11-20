import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoviesApi } from "../api";
import { MovieForCardDTO } from "../dto";
import {
    DataCreateEpisode,
    DataCreateMovie,
    DataGetAllMovies,
    DataGetAllMoviesByCountry,
    DataGetAllMoviesByGenre,
    DataGetAllMoviesByType,
    DataGetFavoriteMovies,
    DataUpdateEpisode,
    DataUpdateMovie,
    TResFavoriteMovie,
    TResGetFeaturedMovies,
    TResGetMovie,
    TResGetMovies,
    TResGetMoviesByCountry,
    TResGetMoviesByGenre,
    TResGetMoviesByType,
    TResGetMoviesFavorite,
    TResGetSearchMovies
} from "../model";

export class MoviesService {
    static get_movie(slug: string) {
        const { data, isFetching, isError, refetch } = useFetcher<TResGetMovie>(
            [QUERY_KEY.GET_MOVIE_DETAIL, slug],
            () => MoviesApi.get_movie(slug),
            { enabled: !!slug }
        );
        return { data, isFetching, isError, refetch };
    }

    static get_movies_by_genre({ slug, page = 1, limit = 20 }: DataGetAllMoviesByGenre) {
        const { data } = useFetcher<TResGetMoviesByGenre>([QUERY_KEY.GET_MOVIE_BY_GENRE, slug, page], () =>
            MoviesApi.get_movies_by_genre({ slug, page, limit })
        );
        return { data };
    }
    static get_movies_by_country({ slug, page, limit }: DataGetAllMoviesByCountry) {
        const { data } = useFetcher<TResGetMoviesByCountry>([QUERY_KEY.GET_MOVIE_BY_COUNTRY, slug, page], () =>
            MoviesApi.get_movies_by_country({ slug, page, limit })
        );
        return { data };
    }

    static get_movies_by_type({ slug, page, limit }: DataGetAllMoviesByType) {
        const { data } = useFetcher<TResGetMoviesByType>([QUERY_KEY.GET_MOVIE_BY_TYPE, slug, page], () =>
            MoviesApi.get_movies_by_type({ slug, page, limit })
        );
        return { data };
    }
    static use_movies({ page, limit, movie_type_id, country, genre }: DataGetAllMovies) {
        const {
            data,
            isFetching,
            refetch: refetchMovies
        } = useFetcher<TResGetMovies>([QUERY_KEY.GET_LIST_MOVIES, page,limit, movie_type_id, country, genre], () =>
            MoviesApi.get_movies({ page, limit, movie_type_id, country, genre })
        );
        const { mutate: createMovieMutation, isPending: isPeddingCreateMovie } = useMutation({
            mutationFn: (data: DataCreateMovie) => MoviesApi.create_movie(data)
        });

        const { mutate: updateMovieMutation, isPending: isPeddingUpdateMovie } = useMutation({
            mutationFn: (data: { data: DataUpdateMovie; id: string }) =>
                MoviesApi.update_movie({ data: data.data, id: data.id })
        });
        const {
            mutate: deleteMovieMutation,
            isPending: isPeddingDeleteMovie,
            mutateAsync: mutateAsyncDeleteMovie
        } = useMutation({
            mutationFn: (id: string) => MoviesApi.delete_movie(id)
            // onMutate: async (id) => {
            //     const queryKey = [QUERY_KEY.GET_LIST_MOVIES, page];
            //     await queryClient.cancelQueries({ queryKey });

            //     const previousData = queryClient.getQueryData<TResGetMovies>(queryKey);
            //     if (previousData) {
            //         queryClient.setQueryData<TResGetMovies>(queryKey, {
            //             ...previousData,
            //             data: [...previousData.data.filter((movie) => movie.id !== id)]
            //         });
            //     }

            //     return {
            //         previousData
            //     };
            // },
            // onError(_, __, context) {
            //     queryClient.setQueryData<TResGetMovies>([QUERY_KEY.GET_FAVORITE_MOVIES], context?.previousData);
            // }
        });

        return {
            data,
            isFetching,
            refetchMovies,
            createMovieMutation,
            updateMovieMutation,
            deleteMovieMutation,
            mutateAsyncDeleteMovie,
            isPeddingCreateMovie,
            isPeddingUpdateMovie,
            isPeddingDeleteMovie
        };
    }
    // Quản lý tập phim
    static use_episodes() {
        const { mutate: createEpisodeMutation, isPending: isPeddingCreateEpisode } = useMutation({
            mutationFn: ({ movie_id, data }: { movie_id: string; data: DataCreateEpisode }) =>
                MoviesApi.create_episodes({
                    movie_id,
                    data
                })
        });
        const { mutate: deleteEpisodeMutation, isPending: isPeddingDeleteEpisode } = useMutation({
            mutationFn: (episode_id: string) => MoviesApi.delete_episode(episode_id)
        });

        const { mutate: updateEpisodeMutation, isPending: isPeddingUpdateEpisode } = useMutation({
            mutationFn: ({ episode_id, data }: { episode_id: string; data: DataUpdateEpisode }) =>
                MoviesApi.update_episode({
                    episode_id,
                    data
                })
        });

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
    static get_search_movie({ query, movie_type_id }: { query: string; movie_type_id?: "typ1" | "type2" }) {
        const { data, isFetching, isError, refetch } = useFetcher<TResGetSearchMovies>(
            [QUERY_KEY.GET_SEARCH_MOVIE, query],
            () => MoviesApi.search_movie({ query, movie_type_id }),
            { enabled: !!query }
        );

        return { data, isFetching, isError, refetch };
    }
    // Ẩn hiện phim
    static change_visible_movie() {
        const { mutate: mutateChangeVisibleMovie, isPending: isPendingChangeVisibleMovie } = useMutation({
            mutationFn: ({ movie_id, is_visible }: { movie_id: string; is_visible: boolean }) =>
                MoviesApi.change_visible_movie({ movie_id, is_visible })
        });

        return { mutateChangeVisibleMovie, isPendingChangeVisibleMovie };
    }
    // Get đanh sách phim yêu thích
    static use_favorite_movie({ user_id }: DataGetFavoriteMovies) {
        const {
            data: moviesFavoriteByUser,
            isFetching: isFetchingMoviesFavorite,
            refetch: refetchMoviesFavorite
        } = useFetcher<TResGetMoviesFavorite>(
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

                const previousData = queryClient.getQueryData<TResGetMoviesFavorite>(queryKey);
                if (previousData) {
                    queryClient.setQueryData<TResGetMoviesFavorite>(queryKey, [...previousData, movie]);
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<TResGetMoviesFavorite>([QUERY_KEY.GET_FAVORITE_MOVIES], context?.previousData);
            }
            // Nếu thành công, khi truy cập vào route thì sẽ gọi lại API để đồng bộ dữ liệu
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

                const previousData = queryClient.getQueryData<TResGetMoviesFavorite>(queryKey);
                if (previousData) {
                    queryClient.setQueryData<TResGetMoviesFavorite>(queryKey, [
                        ...previousData.filter((movie) => movie.id !== movie_id)
                    ]);
                }

                return {
                    previousData
                };
            },
            onError(_, __, context) {
                queryClient.setQueryData<TResGetMoviesFavorite>([QUERY_KEY.GET_FAVORITE_MOVIES], context?.previousData);
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
        } = useFetcher<TResFavoriteMovie>(
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
        const { data: featuredMovies, isFetching: isFetchingFeaturedMovies } = useFetcher<TResGetFeaturedMovies>(
            [QUERY_KEY.GET_LIST_FEATURED_MOVIES],
            () => MoviesApi.get_featured_movies()
        );
        return {
            featuredMovies,
            isFetchingFeaturedMovies
        };
    }
}
