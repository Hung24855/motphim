import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { CrawlerApi } from "../api";
import { useMutation } from "@tanstack/react-query";
import { DataUpdateMovieCrawl } from "../model";

export class CrawlerService {
    static useCrawlData({
        enabled,
        params
    }: {
        enabled: boolean;
        params: { start: string | number; end: string | number };
    }) {
        const { data, isFetching, isError, refetch } = useFetcher(
            [QUERY_KEY.GET_DATA_CRAWLER, params],
            () => CrawlerApi.crawler_data(params),
            {
                enabled
            }
        );
        const {
            mutate: mutateUpdateDataCrawl,
            mutateAsync: mutateAsyncUpdateDataCrawl,
            isPending: isPeddingUpdateDataCrawl,
            isSuccess: isSuccessUpdateDataCrawl
        } = useMutation({
            mutationFn: (data: DataUpdateMovieCrawl) => CrawlerApi.crawler_update_data(data)
        });

        return {
            data,
            isFetching,
            isError,
            refetch,
            mutateUpdateDataCrawl,
            isSuccessUpdateDataCrawl,
            mutateAsyncUpdateDataCrawl
        };
    }
}
