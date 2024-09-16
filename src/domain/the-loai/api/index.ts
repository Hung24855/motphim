import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { IDataCreateGenres } from "../model";

export class GenresApi {
    static async get_all_genres() {
        try {
            const { data } = await http.get(ENDPOINT_URL.get_genres());
            return data;
        } catch (error) {
            console.log("Error: get_all_genres ", error);
        }
    }
    static async create_genres(data: IDataCreateGenres) {
        try {
            const { data: res } = await http.post(ENDPOINT_URL.create_genre(), data);
            return res;
        } catch (error) {
            console.log("Error: create_genres ", error);
        }
    }
    static async update_genres(data: IDataCreateGenres, id: string) {
        try {
            const { data: res } = await http.put(ENDPOINT_URL.update_genre(id), data);
            return res;
        } catch (error) {
            console.log("Error: update_genres ", error);
        }
    }
    static async delete_genres(id: string) {
        try {
            const { data: res } = await http.delete(ENDPOINT_URL.delete_genre(id));
            return res;
        } catch (error) {
            console.log("Error: delete_genres ", error);
        }
    }
}
