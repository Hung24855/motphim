import Link from "next/link";

export default function MovieManagement() {
    return (
        <div>
            <h1 className="text-xl font-semibold">Quản lý phim</h1>
            <Link href={"/admin/phim/them-phim"}>
                <button className="rounded bg-[#7c69ef] px-3 py-2 text-white">Thêm phim</button>
            </Link>
        </div>
    );
}
