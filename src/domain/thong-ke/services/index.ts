import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { StatisticalApi } from "../api";
import { TResGetStatistical } from "../model";

export class StatisticalService {
    static get_statistical() {
        const {
            data: statistical_data,
            isFetching,
            isError,
            refetch
        } = useFetcher<TResGetStatistical>([QUERY_KEY.GET_STATISTICAL], () => StatisticalApi.get_statistical());
        return { statistical_data, isFetching, isError, refetch };
    }
}
