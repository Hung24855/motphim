import MaxWidth from "@/components/layout/max-width";
import { Fragment } from "react";

export function MovieCardSkeleton() {
    return (
        <div className="animate-pulse overflow-hidden rounded-lg bg-gray-800">
            {/* Movie Poster Skeleton */}
            <div className="h-64 w-full bg-gray-700"></div>

            {/* Movie Info Skeleton */}
            <div className="p-4">
                <div className="mb-2 h-6 w-1/2 rounded bg-gray-700"></div>
                <div className="mb-1 h-4 w-1/4 rounded bg-gray-700"></div>
                <div className="mb-1 h-4 w-3/4 rounded bg-gray-700"></div>
                <div className="h-4 w-1/3 rounded bg-gray-700"></div>
            </div>
        </div>
    );
}

export const ListMovieSkeleton = () => {
    return (
        <MaxWidth className="px-2 pb-10 pt-24">
            {/* Title */}
            {/* <div className="w-[200px] animate-pulse rounded-md bg-gray-800 py-3 ml-4"></div> */}
            <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                    <Fragment key={item}>
                        <MovieCardSkeleton key={item} />
                    </Fragment>
                ))}
            </div>
        </MaxWidth>
    );
};
