export default function MovieCardSkeleton( key:any) {
    return (
        <div className="animate-pulse overflow-hidden rounded-lg bg-gray-800" key={key}>
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
