import { ISuccessResponse } from "@/infrastructure/config/types/apiResponse";
export type CrawlerDataDTO = {
    movie_name: string;
    slug: string;
    image: string;
    content: string;
    time_per_episode: string;
    episode_current: string;
    episode_total: string;
    year: number;
    movie_type_id: string;
    genres: string[];
    countries: string[];
    episodes: {
        link: string;
        slug: string;
        name: string;
    }[];
};

export type DataGetMovieCrawlDTO = ISuccessResponse<{ listMovies: CrawlerDataDTO[] }>;
export type DataGetSearchMovieCrawlDTO = ISuccessResponse<CrawlerDataDTO[]>;
