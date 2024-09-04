import { useQuery } from "@tanstack/react-query";

export interface IFetcherOptions<TData> {
    staleTime?: number;
    cacheTime?: number;
    refetchOnMount?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    enabled?: boolean;
    select?: (state: TData) => any;
    onSuccess?: (data: TData) => void;
    onError?: (err: unknown) => void;
}

export const useFetcher = <TData>(keys: any[], fetchFn: () => Promise<TData>, options?: IFetcherOptions<TData>) => {
    const { data, isLoading, isFetching, isError, error, refetch } = useQuery<TData, unknown, TData>({
        queryKey: keys,
        queryFn: fetchFn,
        retry: false,
        ...options
    });

    return {
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch
    };
};
