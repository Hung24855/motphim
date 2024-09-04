import { GetAllGenresDTO } from './../dto/index';
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { GenresApi } from "../api";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";


export class GenresService {
    static useGenres() {
        const { data } = useFetcher<GetAllGenresDTO>([QUERY_KEY.GET_ALL_GENRES], () => GenresApi.get_all_genres());
        return { data };
    }
}
