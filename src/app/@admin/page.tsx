import Link from "next/link";
import { Fragment } from "react";

export default function AdminPage() {
    return (
        <Fragment>
            <h1 className="text-xl font-semibold">Quản lý phim</h1>
            <div className="mt-4">
                <Link href={"/admin/phim/them-phim"}>
                    <button className="rounded bg-[#7c69ef] px-3 py-2 text-white">Thêm phim</button>
                </Link>

                <div className="mt-2"></div>
            </div>
        </Fragment>
    );
}
