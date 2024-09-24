export interface IDataCreateMovieType {
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

export type IDataUpdateMovieType = {
    countriesId: number[];
    genresId: number[];
    episode_current: string;
    time_per_episode: string;
    // episodes: Array<{ name: string; link: string; slug: string }>;
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

export type IDataCreateEpisodeType = {
    episodes: { name: string; link: string; slug: string }[];
};
export type IDataUpdateEpisodeType = {
    episodes: { name: string; link: string; slug: string };
};

export type IDataGetAllMoviesType = {
    page?: number | string;
    limit?: number | string;
};

export type IDataGetAllMoviesByGenre = {
    slug: string;
    page?: number | string;
    limit?: number | string;
};
export type IDataGetAllMoviesByType = {
    slug: "phim-le" | "phim-bo";
    page?: number | string;
    limit?: number | string;
};

export type IDataGetAllMoviesByCountry = IDataGetAllMoviesByGenre;

export type IDataGetFavoriteMovies = {
    user_id:string;
};