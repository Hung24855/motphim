"use client";
import MaxWidth from "@/components/layout/max-width";
import MovieCard from "@/components/shared/movie-card";
import { ListMovieSkeleton } from "@/components/shared/movie-card-skeleton";
import { MoviesService } from "@/domain/phim/services";
import { Session } from "next-auth";

export default function Favourite({ session }: { session: Session | null }) {
    const { moviesFavoriteByUser } = MoviesService.use_favorite_movie({
        user_id: session?.user.id ?? ""
    });
    if (!session) {
        return (
            <MaxWidth className="min-h-screen text-white">
                <div className="flex h-screen items-center justify-center pb-10 pt-24 text-3xl px-2">
                    Bạn cần đăng nhập để xem phim yêu thích!
                </div>
            </MaxWidth>
        );
    }
    if (!moviesFavoriteByUser) return <ListMovieSkeleton showTitle />;

    return (
        <MaxWidth className="min-h-screen text-white">
            {moviesFavoriteByUser.data.length > 0 ? (
                <div className="pb-10 pt-24">
                    <div className="px-2 text-2xl">Phim yêu thích</div>
                    {
                        <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {moviesFavoriteByUser.data.map((movie, index) => (
                                <MovieCard key={index} movie={movie} />
                            ))}
                        </div>
                    }
                </div>
            ) : (
                <div className="flex h-screen items-center justify-center pb-10 pt-24 text-3xl px-2">
                    Bạn chưa yêu thích phim nào!
                </div>
            )}
        </MaxWidth>
    );
}
