import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";

export class MoviesApi {
    static async get_movies() {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies());
            return data;
        } catch (error) {
            console.log("Error: get_movies ", error);
        }
    }
    static async get_movies_by_type(id: "phim-le" | "phim-bo") {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_type(id));
            return data;
        } catch (error) {
            console.log("Error: get_movies_by_type ", error);
        }
    }
    static async get_movies_by_genre(id:string) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_genre(id));
            return data;
        } catch (error) {
            console.log("Error: get_movies_by_genre ", error);
        }
    }
    static async get_movies_by_country(id:string) {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_movies_by_country(id));
            return data;
        } catch (error) {
            console.log("Error: get_movies_by_country ", error);
        }
    }
}
