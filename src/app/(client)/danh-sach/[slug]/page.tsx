"use client";
import Pagination from "@/base/libs/pagination";
import MaxWidth from "@/components/layout/max-width";
import MovieCard from "@/components/shared/movie-card";
import { ListMovieSkeleton } from "@/components/shared/movie-card-skeleton";
import { MoviesService } from "@/domain/phim/services";
import { notFound, useSearchParams } from "next/navigation";

type TitleType = {
    title: string;
    slug: "phim-bo" | "phim-le";
};

const TITLE: TitleType[] = [
    {
        title: "Danh sách phim bộ",
        slug: "phim-bo"
    },
    {
        title: "Danh sách phim lẻ",
        slug: "phim-le"
    }
];

export default function ListMovie({ params }: { params: { slug: string } }) {
    const isTitle = TITLE.filter((item) => item.slug === params.slug)[0];
    const SearchParams = useSearchParams();
    if (!isTitle) return notFound();
    const { data: response } = MoviesService.get_movies_by_type({
        slug: isTitle.slug,
        page: SearchParams.get("page") ?? 1,
        limit: 20
    });

    if (!response) return <ListMovieSkeleton showTitle />;

    return (
        <MaxWidth className="min-h-screen text-white">
            <div className="pb-10 pt-24">
                <div className="px-2 text-2xl">{isTitle.title}</div>
                <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {response.data.map((movie) => (
                        <MovieCard key={movie.slug} movie={movie} />
                    ))}
                </div>

                {/* Phân trang */}

                {response.pagination && response.pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center pb-10 pt-16">
                        <Pagination
                            totalPage={response.pagination.totalPages}
                            initPage={Number(SearchParams.get("page") ?? 1)}
                        />
                    </div>
                )}
            </div>
        </MaxWidth>
    );
}
