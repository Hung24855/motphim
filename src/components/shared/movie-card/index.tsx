import Link from "next/link";

const img = "https://img.ophim.live/uploads/movies/du-phuong-hanh-thumb.jpg";
export default function MovieCard() {
    return (
        <Link href={"/phim/thieu-lam-tu"}>
            <div className="relative cursor-pointer rounded border border-gray-600 p-1">
                <img src={img} alt="img" className="aspect-[2/3]" />
                <div className="mt-2 flex justify-between">
                    <h2 className="line-clamp-1">Dữ phượng hành</h2>
                    <span className="text-primary">2024</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                    <div>Vietsub</div>
                    <div>23 Phút/tập</div>
                </div>
                <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-1 text-sm">12 Tập</div>
                <div className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-sm text-primary">HD</div>
            </div>
        </Link>
    );
}
