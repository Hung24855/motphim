import MovieCategory from "@/components/home/movies/movie-category";
import Slide from "@/components/home/slide";
import MaxWidth from "@/components/layout/max-width";

export default function Home() {
    return (
        <main className="pb-2">
            <Slide />
            <MaxWidth className="min-h-screen px-2 pt-2 text-white">
                <MovieCategory title="Phim mới cập nhật" />
                <MovieCategory title="Phim cổ trang" />
                <MovieCategory title="Phim anime" />
            </MaxWidth>
        </main>
    );
}
