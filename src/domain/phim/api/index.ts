import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
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

export class MoviesApi {
    static async get_movie(slug: string) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movie(slug));
            return data;
        } catch (error) {
            console.log("Error: get_movie ", error);
        }
    }
    static async get_movies(params: IDataGetAllMoviesType) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies(), {
                params: {
                    page: params.page ?? 1,
                    limit: params.limit ?? 10
                }
            });
            return data;
        } catch (error) {
            console.log("Error: get_movies ", error);
        }
    }
    static async get_movies_by_type(params: IDataGetAllMoviesByType) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_type(params.slug), {
                params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
            });
            return data;
        } catch (error) {
            console.log("Error: get_movies_by_type ", error);
        }
    }
    static async get_movies_by_genre(params: IDataGetAllMoviesByGenre) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_genre(params.slug), {
                params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
            });

            return data;
        } catch (error) {
            console.log("Error: get_movies_by_genre ", error);
        }
    }
    static async get_movies_by_country(params: IDataGetAllMoviesByCountry) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_country(params.slug), {
                params: { page: params?.page ?? 1, limit: params?.limit ?? 20 }
            });
            return data;
        } catch (error) {
            console.log("Error: get_movies_by_country ", error);
        }
    }
    //movie CRUD
    static async create_movie(data: IDataCreateMovieType) {
        try {
            const { data: res } = await http.post(ENDPOINT_URL.create_movie(), data);
            return res;
        } catch (error) {
            console.log("Error: create_movie ", error);
        }
    }
    static async update_movie({ data, id }: { data: IDataUpdateMovieType; id: string }) {
        try {
            const { data: res } = await http.put(ENDPOINT_URL.update_movie(id), data);
            return res;
        } catch (error) {
            console.log("Error: update_movie ", error);
        }
    }
    static async delete_movie(id: string) {
        try {
            const { data: res } = await http.delete(ENDPOINT_URL.delete_movie(id));
            return res;
        } catch (error) {
            console.log("Error: delete_movie ", error);
        }
    }
    //episode CRUD
    static async delete_episode(episode_id: string) {
        try {
            const { data: res } = await http.delete(ENDPOINT_URL.delete_episode(episode_id));
            return res;
        } catch (error) {
            console.log("Error: delete_episode ", error);
        }
    }
    static async create_episodes({ movie_id, data }: { movie_id: string; data: IDataCreateEpisodeType }) {
        try {
            const { data: res } = await http.post(ENDPOINT_URL.create_episodes(movie_id), data);
            return res;
        } catch (error) {
            console.log("Error: create_episodes ", error);
        }
    }
    static async update_episode({ episode_id, data }: { episode_id: string; data: IDataUpdateEpisodeType }) {
        try {
            const { data: res } = await http.put(ENDPOINT_URL.update_episode(episode_id), data);
            return res;
        } catch (error) {
            console.log("Error: update_episodes ", error);
        }
    }

    // Search phim
    static async search_movie(query: string) {
        try {
            console.log("query", query);

            const { data } = await http.get(ENDPOINT_URL.search_movie(), {
                params: { q: query }
            });
            return data;
        } catch (error) {
            console.log("Error: search_movie ", error);
        }
    }

    // Ẩn hiện phim
    static async change_visible_movie({ movie_id, is_visible }: { movie_id: string; is_visible: boolean }) {
        try {
            const { data: res } = await http.put(ENDPOINT_URL.change_visible_movie(movie_id), {
                is_visible
            });
            return res;
        } catch (error) {
            console.log("Error: change_visible_movie ", error);
        }
    }

    static async get_favorite_movies(user_id: string) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_favorite_movies(user_id));
            return data;
        } catch (error) {
            console.log("Error: get_favorite movies ", error);
        }
    }

    // Yêu thích
    static async favorite_movie({ movie_id, user_id }: { movie_id: string; user_id: string }) {
        try {
            const { data } = await http.post(ENDPOINT_URL.favorite_movie(movie_id), {
                user_id
            });
            return data;
        } catch (error) {
            console.log("Error: favorite_movie ", error);
        }
    }

    // Bỏ yêu thích
    static async unfavorite_movie({ movie_id, user_id }: { movie_id: string; user_id: string }) {
        try {
            const { data } = await http.delete(ENDPOINT_URL.favorite_movie(movie_id), { data: { user_id } });
            return data;
        } catch (error) {
            console.log("Error: unfavorite_movie ", error);
        }
    }

    // Kiểm tra phim yêu thích
    static async check_favorite_movie(movie_id: string) {
        try {
            const { data } = await http.get(ENDPOINT_URL.check_favorite_movie(movie_id));
            return data;
        } catch (error) {
            console.log("Error: check_favorite_movie ", error);
        }
    }

    // Danh sách phim có nhiều views nhiều nhất
    static async get_featured_movies() {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_featured_movies());
            return data;
        } catch (error) {
            console.log("Error: get_featured_movies ", error);
        }
    }
}
