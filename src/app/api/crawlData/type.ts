export type MovieDetail = {
    seoOnPage: {
        titleHead: string;
        seoSchema: {
            image: string;
            name: string;
        };
        descriptionHead: string;
    };
    item: {
        _id: string;
        name: string;
        slug: string;
        content: string;
        type: string;
        status: "completed" | "ongoing" | "trailer";
        time: string;
        episode_current: string;
        episode_total: string;
        lang: string;
        year: number;
        category: {
            id: string;
            name: string;
            slug: string;
        }[];
        country: {
            id: string;
            name: string;
            slug: string;
        }[];
        episodes: {
            server_data: {
                name: string;
                slug: string;
                link_embed: string;
            }[];
        }[];
    };
};

export type Movies = {
    image: string;
    slug: string;
    movie_name: string;
    content: string;
    time_per_episode: string;
    episode_current: string;
    episode_total: string;
    year: number;
    genres: string[];
    countries: string[];
    episodes: Episode[];
}[];

export type Episode = {
    name: string;
    slug: string;
    link: string;
};

export type MoviesSearch = {
    data: {
        items: {
            slug: string;
        }[];
    };
};
