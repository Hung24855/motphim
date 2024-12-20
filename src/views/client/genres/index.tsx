"use client";
import Pagination from "@/base/libs/pagination";
import MaxWidth from "@/components/layout/max-width";
import MovieCard from "@/components/client/movie-card";
import { ListMovieSkeleton } from "@/components/client/movie-card-skeleton";
import { MoviesService } from "@/domain/phim/services";
import { useSearchParams } from "next/navigation";

export default function GenresPage({ slug }: { slug: string }) {
    const SearchParams = useSearchParams();
    const { data: movies } = MoviesService.get_movies_by_genre({
        slug,
        page: SearchParams.get("page") ?? 1
    });

    if (!movies) return <ListMovieSkeleton showTitle />;

    return (
        <MaxWidth className="min-h-screen text-white">
            {movies.data.length > 0 ? (
                <div className="pb-10 pt-24">
                    <div className="px-2 text-2xl">Phim {movies.data[0].genre_name}</div>
                    {
                        <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {movies.data.map((movie) => (
                                <MovieCard key={movie.slug} movie={movie} />
                            ))}
                        </div>
                    }

                    {/* Phân trang */}
                    {movies.pagination && movies.pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center pb-10 pt-16">
                            <Pagination
                                totalPage={movies.pagination.totalPages}
                                initPage={Number(SearchParams.get("page") ?? 1)}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex h-screen items-center justify-center px-2 pb-10 pt-24 text-3xl">
                    Hiện tại chưa có phim cho thể loại này!
                </div>
            )}
        </MaxWidth>
    );
}
