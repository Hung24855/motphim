import { useFetcher } from "@/infrastructure/hooks/useFetcher";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { StatisticalApi } from "../api";
import { IStatisticalDTO } from "../dto";

export class StatisticalService {
    static get_statistical() {
        const {
            data: statistical_data,
            isFetching,
            isError,
            refetch
        } = useFetcher<IStatisticalDTO>([QUERY_KEY.GET_STATISTICAL], () => StatisticalApi.get_statistical());
        return { statistical_data, isFetching, isError, refetch };
    }
}
