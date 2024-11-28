import MovieCategory from "@/components/client/movies/movie-category";
import Slide from "@/components/client/slide";

export default async function Home() {
    return (
        <main className="pb-2">
            <Slide />
            <MovieCategory title="Phim cổ trang" slug="co-trang" />
            <MovieCategory title="Phim hành động" slug="hanh-dong" />
            <MovieCategory title="Phim tình cảm" slug="tinh-cam" />
            <MovieCategory title="Phim kinh dị" slug="kinh-di" />
            <MovieCategory title="Phim hài hước" slug="hai-huoc" />
        </main>
    );
}
