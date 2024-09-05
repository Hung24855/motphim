import { useFetcher } from "@/infrastructure/hooks/useFetcher";

import { QUERY_KEY } from "@/infrastructure/constant/query-key";

import { MoviesApi } from "../api";
import { DataGetMoviesDTO } from "../dto";

export class MoviesService {
    // static useMovies() {
    //     const { data } = useFetcher<GetAllGenresDTO>([QUERY_KEY.GET_ALL_GENRES], () => GenresApi.get_all_genres());
    //     return { data };
    // }

    static get_movies_by_genre(slug: string) {
        const { data } = useFetcher<DataGetMoviesDTO>([QUERY_KEY.GET_MOVIE_BY_GENRE,slug], () =>
            MoviesApi.get_movies_by_genre(slug)
        );
        return { data };
    }
}
