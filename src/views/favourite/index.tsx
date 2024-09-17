import MaxWidth from "@/components/layout/max-width";
import MovieCard from "@/components/shared/movie-card";

export default function Favourite() {
    return (
        <MaxWidth className="min-h-screen text-white">
            <div className="pb-10 pt-24">
                <h1 className="text-2xl">Phim yêu thích</h1>
                <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"></div>

                {/* Phân trang */}
            </div>
        </MaxWidth>
    );
}
