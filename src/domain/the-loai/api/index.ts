import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { DataCreateGenres, DataUpdateGenres, TResCreateGenre, TResGetAllGenre, TResUpdateGenre } from "../model";
import { requester } from "@/infrastructure/config/request/requester";
import { CreateGenreDTO, GetAllGenresDTO, UpdateGenreDTO } from "../dto";

export class GenresApi {
    static async get_all_genres() {
        const get_all = await requester<TResGetAllGenre>({
            requestFunc: () => http.get(ENDPOINT_URL.get_genres()),
            handleData: (data: GetAllGenresDTO) => data.data
        })();
        return get_all;
    }
    static async create_genres(data: DataCreateGenres) {
        const res = await requester<TResCreateGenre>({
            requestFunc: () => http.post(ENDPOINT_URL.create_genre(), data),
            handleData: (data: CreateGenreDTO) => data.data
        })();
        return res;
    }
    static async update_genres({ data, id }: { data: DataUpdateGenres; id: number }) {
        const res = await requester<TResUpdateGenre>({
            requestFunc: () => http.put(ENDPOINT_URL.update_genre(id), data),
            handleData: (data: UpdateGenreDTO) => data.data
        })();
        return res;
    }
}
