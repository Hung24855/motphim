import { DataGetMoviesDTO } from "@/domain/phim/dto";
import Link from "next/link";
import { motion } from "framer-motion";

type Movie = DataGetMoviesDTO["data"][0];
// const img = "https://img.ophim.live/uploads/movies/du-phuong-hanh-thumb.jpg";
export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Link href={"/phim/" + movie.slug} scroll={true}>
            <motion.div
                className="relative cursor-pointer rounded border border-gray-600 p-1 min-h-64"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "tween" }}
                viewport={{ once: true }}
            >
                <img src={movie.image} alt="img" className="aspect-[2/3]" loading="lazy" />
                <div className="mt-2 flex justify-between">
                    <h2 className="line-clamp-1">{movie.movie_name}</h2>
                    <span className="text-primary">{movie.year}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                    <div>{movie.lang}</div>
                    <div>{movie.time_per_episode}</div>
                </div>
                <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-1 text-sm">
                    {Number(movie.episode_current)}/{Number(movie.episode_total)} Tập
                </div>
                <div className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-sm text-primary">HD</div>
            </motion.div>
        </Link>
    );
}
