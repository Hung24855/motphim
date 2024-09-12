"use client";
import Pagination from "@/base/libs/pagination";
import MaxWidth from "@/components/layout/max-width";
import MovieCard from "@/components/shared/movie-card";
import MovieCardSkeleton from "@/components/shared/movie-card-skeleton";
import { MoviesService } from "@/domain/phim/services";
import { notFound } from "next/navigation";

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

const ListMovieSkeleton = () => {
    return (
        <MaxWidth className="pb-10 pt-24 px-2">
            {/* Title */}
            {/* <div className="w-[200px] animate-pulse rounded-md bg-gray-800 py-3 ml-4"></div> */}
            <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 120].map((_, index) => (
                    <MovieCardSkeleton />
                ))}
            </div>
        </MaxWidth>
    );
};

export default function ListMovie({ params }: { params: { slug: string } }) {
    const isTitle = TITLE.filter((item) => item.slug === params.slug)[0];
    if (!isTitle) return notFound();
    const { data: response } = MoviesService.get_movies_by_type(isTitle.slug);
  

    if (!response) return <ListMovieSkeleton></ListMovieSkeleton>;

    // console.log(response.pagination.totalPages);

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

                {response.pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center pb-10 pt-16">
                        <Pagination totalPage={response.pagination.totalPages} initPage={Number(1)} />
                    </div>
                )}
            </div>
        </MaxWidth>
    );
}
