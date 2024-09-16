import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import {
    IDataCreateEpisodeType,
    IDataCreateMovieType,
    IDataGetAllMoviesByCountry,
    IDataGetAllMoviesByGenre,
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
    static async get_movies_by_type(slug: "phim-le" | "phim-bo") {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_type(slug));
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
}
