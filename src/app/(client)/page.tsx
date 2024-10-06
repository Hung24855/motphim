import MovieCategory from "@/components/home/movies/movie-category";
import Slide from "@/components/home/slide";
import MaxWidth from "@/components/layout/max-width";

export default async function Home() {
    

    return (
        <main className="pb-2">
            
            <Slide />
            <MaxWidth className="min-h-screen px-2 pt-2 text-white">
                <MovieCategory title="Phim cổ trang" slug="co-trang" />
                <MovieCategory title="Phim hành động" slug="hanh-dong" />
                <MovieCategory title="Phim tình cảm" slug="tinh-cam" />
            </MaxWidth>
        </main>
    );
}
