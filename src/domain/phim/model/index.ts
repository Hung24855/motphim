//cấu trúc  data cần để truyền đến back-end và cấu trúc  data lưu trữ trong react-query
import {
    DataGetMoviesByCountryDTO,
    DataGetMoviesByGenreDTO,
    DataGetMoviesDTO,
    Episode,
    FeaturedMovie,
    MovieForCardDTO,
    MoviesDetailDTO
} from "../dto";

export interface DataCreateMovie {
    countriesId: number[];
    genresId: number[];
    episode_current: string;
    time_per_episode: string;
    episodes: {
        name: string;
        link: string;
        slug: string;
    }[];
    movie_name: string;
    movie_type_id: string;
    quality: string;
    image: string;
    episode_total: string;
    trailer_youtube_url: string;
    year: string;
    slug: string;
    content: string;
}

export type DataUpdateMovie = {
    countriesId: number[];
    genresId: number[];
    episode_current: string;
    time_per_episode: string;
    movie_name: string;
    movie_type_id: string;
    quality: string;
    image: string;
    episode_total: string;
    trailer_youtube_url: string;
    year: string;
    slug: string;
    content: string;
};

export type DataCreateEpisode = {
    episodes: { name: string; link: string; slug: string }[];
};
export type DataUpdateEpisode = {
    episodes: { name: string; link: string; slug: string };
};

export type DataGetAllMovies = {
    page?: number | string;
    limit?: number | string;
    movie_type_id?: "type1" | "type2";
};

export type DataGetAllMoviesByGenre = {
    slug: string;
    page?: number | string;
    limit?: number | string;
};
export type DataGetAllMoviesByType = {
    slug: "phim-le" | "phim-bo";
    page?: number | string;
    limit?: number | string;
};

export type DataGetAllMoviesByCountry = DataGetAllMoviesByGenre;

export type DataGetFavoriteMovies = {
    user_id: string;
};

export type TResGetMovie = MoviesDetailDTO[];
export type TResGetMovies = Pick<DataGetMoviesDTO, "data" | "pagination">;
export type TResGetMoviesByType = Pick<DataGetMoviesDTO, "data" | "pagination">;
export type TResGetMoviesByGenre = Pick<DataGetMoviesByGenreDTO, "data" | "pagination">;
export type TResGetMoviesByCountry = Pick<DataGetMoviesByCountryDTO, "data" | "pagination">;
export type TResGetSearchMovies = MovieForCardDTO[];
export type TResChangeVisibleMovie = { id: string; is_visible: boolean };
export type TResGetMoviesFavorite = MovieForCardDTO[];
export type TResFavoriteMovie = { id: string; is_favorites: boolean };
export type TResGetFeaturedMovies = FeaturedMovie[];
export type TResDeletedMovie = { id: string };
export type TResDeletedEpisode = { id: string };
export type TResUpdateEpisode = Episode;
