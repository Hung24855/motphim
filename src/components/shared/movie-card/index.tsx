import { DataGetMoviesDTO } from "@/domain/phim/dto";
import Link from "next/link";

type Movie = DataGetMoviesDTO["data"][0];
// const img = "https://img.ophim.live/uploads/movies/du-phuong-hanh-thumb.jpg";
export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Link href={"/phim/" + movie.slug} scroll={true}>
            <div className="relative cursor-pointer rounded border border-gray-600 p-1">
                <img src={movie.image} alt="img" className="aspect-[2/3]" />
                <div className="mt-2 flex justify-between">
                    <h2 className="line-clamp-1">{movie.movie_name}</h2>
                    <span className="text-primary">{movie.year}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                    <div>{movie.lang}</div>
                    <div>{movie.time_per_episode}</div>
                </div>
                <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-1 text-sm">
                    {movie.episode_current} Tập
                </div>
                <div className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-sm text-primary">HD</div>
            </div>
        </Link>
    );
}
