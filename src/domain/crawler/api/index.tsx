import { ENDPOINT_URL } from "@/infrastructure/config/endpointUrl";
import http from "@/infrastructure/config/request";
import { requester } from "@/infrastructure/config/request/requester";
import { DataUpdateMovieCrawl, TResGetMovieCrawl } from "../model";
import { DataGetMovieCrawlDTO } from "../dto";

export class CrawlerApi {
    static async crawler_data(params: { start: number | string; end: number | string }) {
        return await requester<TResGetMovieCrawl>({
            requestFunc: () => http.get(ENDPOINT_URL.crawler(), { params }),
            handleData: (data: DataGetMovieCrawlDTO) => data.data.listMovies
        })();
    }

    static async crawler_update_data(data: DataUpdateMovieCrawl) {
        return await requester({
            requestFunc: () => http.put(ENDPOINT_URL.crawler(), data)
        })();
    }
}
