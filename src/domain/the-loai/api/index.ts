import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { CreateGenreDTO, DeleteGenreDTO, GetAllGenresDTO, UpdateGenreDTO } from "../dto";
import { DataCreateGenres, DataUpdateGenres, TResCreateGenre, TResDeleteGenre, TResGetAllGenre, TResUpdateGenre } from "../model";

export class GenresApi {
    static async get_all_genres() {
        return await requester<TResGetAllGenre>({
            requestFunc: () => http.get(ENDPOINT_URL.get_genres()),
            handleData: (data: GetAllGenresDTO) => data.data
        })();
    }
    static async create_genres(data: DataCreateGenres) {
        return await requester<TResCreateGenre>({
            requestFunc: () => http.post(ENDPOINT_URL.create_genre(), data),
            handleData: (data: CreateGenreDTO) => data.data
        })();
    }
    static async update_genres({ data, id }: { data: DataUpdateGenres; id: number }) {
        return await requester<TResUpdateGenre>({
            requestFunc: () => http.put(ENDPOINT_URL.update_genre(id), data),
            handleData: (data: UpdateGenreDTO) => data.data
        })();
    }
    static async delete_genre( id:number ) {
        return await requester<TResDeleteGenre>({
            requestFunc: () => http.delete(ENDPOINT_URL.delete_genre(id)),
            handleData: (data: DeleteGenreDTO) => data.data
        })();
    }
}
