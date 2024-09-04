import Pagination from "@/base/libs/pagination";
import MaxWidth from "@/components/layout/max-width";
import MovieCard from "@/components/shared/movie-card";
import { notFound } from "next/navigation";

const TITLE = [
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
    const totalPages = 10;

    const isTitle = TITLE.filter((item) => item.slug === params.slug)[0];
    if (!isTitle) return notFound();

    return (
        <MaxWidth className="min-h-screen text-white">
            <div className="pb-10 pt-24">
                <div className="text-2xl px-2">{isTitle.title}</div>
                <div className="mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>

                {/* Phân trang */}

                {totalPages > 1 && (
                    <div className="flex items-center justify-center pb-10 pt-16">
                        <Pagination totalPage={totalPages} initPage={Number(1)} />
                    </div>
                )}
            </div>
        </MaxWidth>
    );
}
