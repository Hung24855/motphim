"use client";
import MaxWidth from "@/components/layout/max-width";
import MovieCard from "@/components/shared/movie-card";
import { ListMovieSkeleton } from "@/components/shared/movie-card-skeleton";
import { MoviesService } from "@/domain/phim/services";
import { useSearchParams } from "next/navigation";

export default function SearchMovieView() {
    const slug = useSearchParams().get("q");
    const { data: movies } = MoviesService.get_search_movie({ query: slug ?? "" });
    if (!movies) return <ListMovieSkeleton />;

    return (
        <MaxWidth className="min-h-screen text-white">
            {movies.length > 0 ? (
                <div className="pb-10 pt-24">
                    <div className="px-2 text-2xl">Tìm kiếm phim</div>
                    {
                        <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {movies.map((movie) => (
                                <MovieCard key={movie.slug} movie={movie} />
                            ))}
                        </div>
                    }
                </div>
            ) : (
                <div className="flex h-screen items-center justify-center px-2 pb-10 pt-24 text-3xl">
                    Phim bạn tìm kiếm không tồn tại!
                </div>
            )}
        </MaxWidth>
    );
}
