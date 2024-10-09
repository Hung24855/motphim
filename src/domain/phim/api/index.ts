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
        const res = await requester<TResGetMovie>({
            requestFunc: () => http.get(ENDPOINT_URL.get_movie(slug)),
            handleData: (data: DataGetMovieDetailDTO) => data.data
        })();
        return res;
    }
    static async get_movies(params: DataGetAllMovies) {
        const res = await requester<TResGetMovies>({
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
        return res;
    }
    static async get_movies_by_type(params: DataGetAllMoviesByType) {
        const res = await requester<TResGetMoviesByType>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.get_movies_by_type(params.slug), {
                    params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
                }),
            handleData: (data: DataGetMoviesDTO) => ({
                data: data.data,
                pagination: data.pagination
            })
        })();
        return res;
    }
    static async get_movies_by_genre(params: DataGetAllMoviesByGenre) {
        const res = await requester<TResGetMoviesByGenre>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.get_movies_by_genre(params.slug), {
                    params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
                }),
            handleData: (data: DataGetMoviesByGenreDTO) => ({
                data: data.data,
                pagination: data.pagination
            })
        })();
        return res;
    }
    static async get_movies_by_country(params: DataGetAllMoviesByCountry) {
        const res = await requester<TResGetMoviesByCountry>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.get_movies_by_country(params.slug), {
                    params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
                }),
            handleData: (data: DataGetMoviesByCountryDTO) => ({
                data: data.data,
                pagination: data.pagination
            })
        })();
        return res;
    }
    //movie CRUD
    static async create_movie(data: DataCreateMovie) {
        const res = await requester({
            requestFunc: () => http.post(ENDPOINT_URL.create_movie(), data)
        })();
        return res;
    }
    static async update_movie({ data, id }: { data: DataUpdateMovie; id: string }) {
        const res = await requester({
            requestFunc: () => http.put(ENDPOINT_URL.update_movie(id), data)
        })();
        return res;
    }
    static async delete_movie(id: string) {
        const res = await requester<TResDeletedMovie>({
            requestFunc: () => http.delete(ENDPOINT_URL.delete_movie(id)),
            handleData: (data: DataDeleteMovieDTO) => data.data
        })();
        return res;
    }
    //episode CRUD
    static async delete_episode(episode_id: string) {
        const res = await requester<TResDeletedEpisode>({
            requestFunc: () => http.delete(ENDPOINT_URL.delete_episode(episode_id)),
            handleData: (data: DataDeleteEpisodeDTO) => data.data
        })();
        return res;
    }
    static async create_episodes({ movie_id, data }: { movie_id: string; data: DataCreateEpisode }) {
        const res = await requester({
            requestFunc: () => http.post(ENDPOINT_URL.create_episodes(movie_id), data)
        })();
        return res;
    }
    static async update_episode({ episode_id, data }: { episode_id: string; data: DataUpdateEpisode }) {
        const res = await requester<TResUpdateEpisode>({
            requestFunc: () => http.put(ENDPOINT_URL.update_episode(episode_id), data),
            handleData: (data: DataUpdateEpisodeDTO) => data.data
        })();
        return res;
    }

    // Search phim
    static async search_movie({ query, movie_type_id }: { query: string; movie_type_id?: "typ1" | "type2" }) {
        const res = await requester<TResGetSearchMovies>({
            requestFunc: () =>
                http.get(ENDPOINT_URL.search_movie(), {
                    params: { q: query, movie_type_id }
                }),
            handleData: (data: DataSearchMovieDTO) => data.data
        })();
        return res;
    }

    // Ẩn hiện phim
    static async change_visible_movie({ movie_id, is_visible }: { movie_id: string; is_visible: boolean }) {
        const res = await requester<TResChangeVisibleMovie>({
            requestFunc: () =>
                http.put(ENDPOINT_URL.change_visible_movie(movie_id), {
                    is_visible
                }),
            handleData: (data: DataChangeVisibleMovieDTO) => data.data
        })();
        return res;
    }
    // Danh sách phim yêu thích
    static async get_favorite_movies(user_id: string) {
        const res = await requester<TResGetMoviesFavorite>({
            requestFunc: () => http.get(ENDPOINT_URL.get_favorite_movies(user_id)),
            handleData: (data: DataGetMoviesFavoriteDTO) => data.data
        })();
        return res;
    }

    // Yêu thích
    static async favorite_movie({ movie_id, user_id }: { movie_id: string; user_id: string }) {
        const res = await requester<TResFavoriteMovie>({
            requestFunc: () =>
                http.post(ENDPOINT_URL.favorite_movie(movie_id), {
                    user_id
                }),
            handleData: (data: DataFavoriteMovieDTO) => data.data
        })();
        return res;
    }

    // Bỏ yêu thích
    static async unfavorite_movie({ movie_id, user_id }: { movie_id: string; user_id: string }) {
        const res = await requester<TResFavoriteMovie>({
            requestFunc: () => http.delete(ENDPOINT_URL.favorite_movie(movie_id), { data: { user_id } }),
            handleData: (data: DataFavoriteMovieDTO) => data.data
        })();
        return res;
    }

    // Kiểm tra phim yêu thích
    static async check_favorite_movie(movie_id: string) {
        const res = await requester<TResFavoriteMovie>({
            requestFunc: () => http.get(ENDPOINT_URL.check_favorite_movie(movie_id)),
            handleData: (data: DataFavoriteMovieDTO) => data.data
        })();
        return res;
    }

    // Danh sách phim có nhiều views nhiều nhất
    static async get_featured_movies() {
        const res = await requester<TResGetFeaturedMovies>({
            requestFunc: () => http.get(ENDPOINT_URL.get_featured_movies()),
            handleData: (data: DataGetFeaturedMoviesDTO) => data.data
        })();
        return res;
    }
}
