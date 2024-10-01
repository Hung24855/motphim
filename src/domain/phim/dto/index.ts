// Thông tin API trả về

import { ISuccessResponse } from "@/infrastructure/config/types/apiResponse";

// Thông tin cho 1 card phim
export interface MovieForCardDTO {
    id: string;
    movie_name: string;
    slug: string;
    year: number;
    image: string;
    time_per_episode: string;
    episode_current: string;
    episode_total: string;
    lang: string;
    is_visible: boolean;
}

// Thông tin tập phim
export interface Episode {
    episode_id: string;
    movie_id: string;
    name: string;
    link: string;
    slug: string;
}

// Chi tiết phim
export interface MoviesDetailDTO {
    id: string;
    movie_name: string;
    slug: string;
    content: string;
    lang: string;
    year: number;
    quality: string;
    title_head: string;
    image: string;
    time_per_episode: string;
    episode_current: string;
    episode_total: string;
    movie_type_id: string;
    is_visible: boolean;
    episodes: Episode[];
    genres: {
        id: number;
        movie_id: string;
        genres_id: number;
        name: string;
        slug: string;
    }[];
    countries: {
        movie_id: string;
        country_id: number;
        name: string;
        slug: string;
    }[];
}
export type DataGetMovieDetailDTO = ISuccessResponse<MoviesDetailDTO[]>;

// Danh sách phim bình thường
export interface DataGetMoviesDTO {
    status: string;
    message: string;
    data: MovieForCardDTO[];
    pagination?: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
}

// Danh sách phim tìm tiếm
export type DataSearchMovieDTO = ISuccessResponse<MovieForCardDTO[]>;

// Danh sách phim yêu thích
export type DataGetMoviesFavoriteDTO = Omit<DataGetMoviesDTO, "pagination">

// Danh sách phim nổi bật
export type FeaturedMovie = { id: string; movie_name: string; slug: string; image: string; content: string };
export type DataGetFeaturedMoviesDTO = ISuccessResponse<FeaturedMovie[]>;

// Danh sách phim theo thể loại
export type MoviesByGenre = {
    id: string;
    movie_name: string;
    slug: string;
    year: number;
    image: string;
    time_per_episode: string;
    episode_current: string;
    episode_total: string;
    lang: string;
    genre_name: string;
};
export interface DataGetMoviesByGenreDTO {
    status: string;
    message: string;
    data: MoviesByGenre[];
    pagination?: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
}

// Danh sách phim quốc gia
export type MoviesByCountry = {
    id: string;
    movie_name: string;
    slug: string;
    year: number;
    image: string;
    time_per_episode: string;
    episode_current: string;
    episode_total: string;
    lang: string;
    country_name: string;
};
export interface DataGetMoviesByCountryDTO {
    status: string;
    message: string;
    data: MoviesByCountry[];
    pagination?: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
}

// Kiểm tra phim đã yêu thích chưa
export type DataCheckFavoriteMovieDTO = ISuccessResponse<
    {
        isFavorites: boolean;
    }[]
>;

// Ẩn hiện phim
export type DataChangeVisibleMovieDTO = ISuccessResponse<{ id: string; is_visible: boolean }>;

// Yêu thích phim và bỏ yêu thích
export type DataFavoriteMovieDTO = ISuccessResponse<{
    id: string;
    is_favorites: boolean;
}>;

// Xóa phim
export type DataDeleteMovieDTO = ISuccessResponse<{ id: string }>;
export type DataDeleteEpisodeDTO = ISuccessResponse<{ id: string }>;
export type DataUpdateEpisodeDTO = ISuccessResponse<Episode>;
