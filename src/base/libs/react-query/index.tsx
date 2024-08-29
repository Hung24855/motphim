"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const minute = 1000 * 60;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: minute * 5
        }
    }
});
export default function ReactQueryProvder({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
