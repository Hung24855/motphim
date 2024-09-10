import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { DataGetMoviesDTO } from "../dto";
import { IDataCreateMovieType } from "../model";

export class MoviesApi {
    static async get_movie(slug: string) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movie(slug));
            return data;
        } catch (error) {
            console.log("Error: get_movie ", error);
        }
    }
    static async get_movies() {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies());
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
    static async get_movies_by_genre(slug: string) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_genre(slug));
            console.log(ENDPOINT_URL.get_movies_by_genre(slug));

            return data;
        } catch (error) {
            console.log("Error: get_movies_by_genre ", error);
        }
    }
    static async get_movies_by_country(slug: string) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_country(slug));
            return data;
        } catch (error) {
            console.log("Error: get_movies_by_country ", error);
        }
    }
    static async create_movie(data: IDataCreateMovieType) {
        try {
            const { data: res } = await http.post(ENDPOINT_URL.create_movie(), data);
            return res;
        } catch (error) {
            console.log("Error: get_movies_by_country ", error);
        }
    }
}
