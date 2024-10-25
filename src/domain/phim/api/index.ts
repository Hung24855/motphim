import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import {
    DataCreateEpisode,
    DataCreateMovie,
    DataGetAllMoviesByCountry,
    DataGetAllMoviesByGenre,
    DataGetAllMoviesByType,
    DataGetAllMovies,
    DataUpdateEpisode,
    DataUpdateMovie,
    TResGetMovie,
    TResGetMovies,
    TResGetMoviesByType,
    TResGetMoviesByGenre,
    TResGetMoviesByCountry,
    TResGetSearchMovies,
    TResChangeVisibleMovie,
    TResGetMoviesFavorite,
    TResFavoriteMovie,
    TResGetFeaturedMovies,
    TResDeletedMovie,
    TResDeletedEpisode,
    TResUpdateEpisode
} from "../model";
import { requester } from "@/infrastructure/config/request/requester";
import {
    DataChangeVisibleMovieDTO,
    DataDeleteEpisodeDTO,
    DataDeleteMovieDTO,
    DataFavoriteMovieDTO,
    DataGetFeaturedMoviesDTO,
    DataGetMovieDetailDTO,
    DataGetMoviesByCountryDTO,
    DataGetMoviesByGenreDTO,
    DataGetMoviesDTO,
    DataGetMoviesFavoriteDTO,
    DataSearchMovieDTO,
    DataUpdateEpisodeDTO
} from "../dto";

export class MoviesApi {
    static async get_movie(slug: string) {
        return await requester<TResGetMovie>({
            requestFunc: () => http.get(ENDPOINT_URL.get_movie(slug)),
            handleData: (data: DataGetMovieDetailDTO) => data.data
        })();
    }
    static async get_movies(params: DataGetAllMovies) {
        return await requester<TResGetMovies>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.get_movies(), {
                    params: {
                        page: params.page ?? 1,
                        limit: params.limit ?? 10
                    }
                }),
            handleData: (data: DataGetMoviesDTO) => ({
                data: data.data,
                pagination: data.pagination
            })
        })();
    }
    static async get_movies_by_type(params: DataGetAllMoviesByType) {
        return await requester<TResGetMoviesByType>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.get_movies_by_type(params.slug), {
                    params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
                }),
            handleData: (data: DataGetMoviesDTO) => ({
                data: data.data,
                pagination: data.pagination
            })
        })();
    }
    static async get_movies_by_genre(params: DataGetAllMoviesByGenre) {
        return await requester<TResGetMoviesByGenre>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.get_movies_by_genre(params.slug), {
                    params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
                }),
            handleData: (data: DataGetMoviesByGenreDTO) => ({
                data: data.data,
                pagination: data.pagination
            })
        })();
    }
    static async get_movies_by_country(params: DataGetAllMoviesByCountry) {
        return await requester<TResGetMoviesByCountry>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.get_movies_by_country(params.slug), {
                    params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
                }),
            handleData: (data: DataGetMoviesByCountryDTO) => ({
                data: data.data,
                pagination: data.pagination
            })
        })();
    }
    //movie CRUD
    static async create_movie(data: DataCreateMovie) {
        return await requester({
            requestFunc: () => http.post(ENDPOINT_URL.create_movie(), data)
        })();
    }
    static async update_movie({ data, id }: { data: DataUpdateMovie; id: string }) {
        return await requester({
            requestFunc: () => http.put(ENDPOINT_URL.update_movie(id), data)
        })();
    }
    static async delete_movie(id: string) {
        return await requester<TResDeletedMovie>({
            requestFunc: () => http.delete(ENDPOINT_URL.delete_movie(id)),
            handleData: (data: DataDeleteMovieDTO) => data.data
        })();
    }
    //episode CRUD
    static async delete_episode(episode_id: string) {
        return await requester<TResDeletedEpisode>({
            requestFunc: () => http.delete(ENDPOINT_URL.delete_episode(episode_id)),
            handleData: (data: DataDeleteEpisodeDTO) => data.data
        })();
    }
    static async create_episodes({ movie_id, data }: { movie_id: string; data: DataCreateEpisode }) {
        return await requester({
            requestFunc: () => http.post(ENDPOINT_URL.create_episodes(movie_id), data)
        })();
    }
    static async update_episode({ episode_id, data }: { episode_id: string; data: DataUpdateEpisode }) {
        return await requester<TResUpdateEpisode>({
            requestFunc: () => http.put(ENDPOINT_URL.update_episode(episode_id), data),
            handleData: (data: DataUpdateEpisodeDTO) => data.data
        })();
    }

    // Search phim
    static async search_movie({ query, movie_type_id }: { query: string; movie_type_id?: "typ1" | "type2" }) {
        return await requester<TResGetSearchMovies>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.search_movie(), {
                    params: { q: query, movie_type_id }
                }),
            handleData: (data: DataSearchMovieDTO) => data.data
        })();
    }

    // Ẩn hiện phim
    static async change_visible_movie({ movie_id, is_visible }: { movie_id: string; is_visible: boolean }) {
        return await requester<TResChangeVisibleMovie>({
            requestFunc: () =>
                http.put(ENDPOINT_URL.change_visible_movie(movie_id), {
                    is_visible
                }),
            handleData: (data: DataChangeVisibleMovieDTO) => data.data
        })();
    }
    // Danh sách phim yêu thích
    static async get_favorite_movies(user_id: string) {
        return await requester<TResGetMoviesFavorite>({
            requestFunc: () => http.get(ENDPOINT_URL.get_favorite_movies(user_id)),
            handleData: (data: DataGetMoviesFavoriteDTO) => data.data
        })();
    }

    // Yêu thích
    static async favorite_movie({ movie_id, user_id }: { movie_id: string; user_id: string }) {
        return await requester<TResFavoriteMovie>({
            requestFunc: () =>
                http.post(ENDPOINT_URL.favorite_movie(movie_id), {
                    user_id
                }),
            handleData: (data: DataFavoriteMovieDTO) => data.data
        })();
    }

    // Bỏ yêu thích
    static async unfavorite_movie({ movie_id, user_id }: { movie_id: string; user_id: string }) {
        return await requester<TResFavoriteMovie>({
            requestFunc: () => http.delete(ENDPOINT_URL.favorite_movie(movie_id), { data: { user_id } }),
            handleData: (data: DataFavoriteMovieDTO) => data.data
        })();
    }

    // Kiểm tra phim yêu thích
    static async check_favorite_movie(movie_id: string) {
        return await requester<TResFavoriteMovie>({
            requestFunc: () => http.get(ENDPOINT_URL.check_favorite_movie(movie_id)),
            handleData: (data: DataFavoriteMovieDTO) => data.data
        })();
    }

    // Danh sách phim có nhiều views nhiều nhất
    static async get_featured_movies() {
        return await requester<TResGetFeaturedMovies>({
            requestFunc: () => http.get(ENDPOINT_URL.get_featured_movies()),
            handleData: (data: DataGetFeaturedMoviesDTO) => data.data
        })();
    }
}
