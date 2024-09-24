export interface Episode {
    episode_id: string;
    movie_id: string;
    name: string;
    link: string;
    slug: string;
}

export interface MoviesDTO {
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

export interface DataGetMovieDetailDTO {
    status: string;
    message: string;
    data: MoviesDTO[];
}

export interface DataGetMoviesDTO {
    status: string;
    message: string;
    data: {
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
    }[];
    pagination: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
}
export type DataSearchMovieDTO = Pick<DataGetMoviesDTO, "status" | "message" | "data">;
export type DataGetMoviesFavoriteDTO = DataSearchMovieDTO;

export interface DataGetMoviesByCountryDTO {
    status: string;
    message: string;
    data: {
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
    }[];
    pagination: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
}

export interface DataGetMoviesByGenreDTO {
    status: string;
    message: string;
    data: {
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
    }[];
    pagination: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
}
