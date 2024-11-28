import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { DataGetMovieCrawlDTO, DataGetSearchMovieCrawlDTO } from "../dto";
import { DataUpdateMovieCrawl, TResGetMovieCrawl, TResGetSearchMovieCrawl } from "../model";

export class CrawlerApi {
    static async crawler_data(params: { start: number | string; end: number | string }) {
        return await requester<TResGetMovieCrawl>({
            requestFunc: () => http.get(ENDPOINT_URL.crawler(), { params }),
            handleData: (data: DataGetMovieCrawlDTO) => data.data.listMovies
        })();
    }

    static async crawler_update_data(data: DataUpdateMovieCrawl) {
        return await requester({
            requestFunc: () => http.put(ENDPOINT_URL.crawlerUpdateData(), data)
        })();
    }
    static async crawler_search_data(query: string) {
        return await requester<TResGetSearchMovieCrawl>({
            requestFunc: () => http.get(ENDPOINT_URL.crawlerSearchData(), { params: { q: query } }),
            handleData: (data: DataGetSearchMovieCrawlDTO) => data.data
        })();
    }
}
