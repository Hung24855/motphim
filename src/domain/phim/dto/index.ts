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
    genre: string;
    genre_slug: string;
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
        movie_name: string;
        slug: string;
        year: number;
        image: string;
        time_per_episode: string;
        episode_current: string;
        lang: string;
    }[];
    pagination: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
}
