"use client";
import Loading from "@/base/libs/loading";
import { convertTime } from "@/base/utils/function";
import Counter from "@/components/admin/counter";
import { StatisticalService } from "@/domain/thong-ke/services";
import { Fragment } from "react";

export default function Doashboard() {
    const { statistical_data, isFetching } = StatisticalService.get_statistical();
    return (
        <Fragment>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-2 text-lg font-semibold">Tổng số phim</h3>
                    <p className="text-3xl font-bold">
                        <Counter number={statistical_data?.total_movies ?? 0} />
                    </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-2 text-lg font-semibold">Tống số tập</h3>
                    <p className="text-3xl font-bold">
                        <Counter number={statistical_data?.total_episodes ?? 0} />
                    </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-2 text-lg font-semibold">Tổng số người dùng</h3>
                    <p className="text-3xl font-bold">
                        <Counter number={statistical_data?.total_users ?? 0} />
                    </p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-2 text-lg font-semibold">Phim mới trong tháng</h3>
                    <p className="text-3xl font-bold">
                        <Counter number={statistical_data?.total_movies_create_this_month ?? 0} />
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-2 shadow-md">
                    <h3 className="mb-4 text-xl font-semibold">Top phim nổi bật</h3>
                    <Loading loading={isFetching}>
                        <ul className="scrollbar-none relative max-h-96 min-h-60 overflow-hidden overflow-y-auto rounded">
                            <li className="sticky top-0 flex items-center justify-between bg-black px-2 py-3 text-white">
                                <span>Tên phim</span>
                                <span>Lượt xem</span>
                            </li>

                            {statistical_data?.rankView?.map((movie) => (
                                <li
                                    key={movie.movie_name}
                                    className="flex items-center justify-between px-2 py-3 hover:bg-[#e5e7e9]"
                                >
                                    <span>{movie.movie_name}</span>
                                    <span className="text-sm text-gray-500">{movie.views} lượt xem</span>
                                </li>
                            ))}
                        </ul>
                    </Loading>
                </div>

                <div className="h-max p-2 shadow-md">
                    <h3 className="mb-4 text-xl font-semibold">Phim mới cập nhật gần đây</h3>
                    <Loading loading={isFetching}>
                        <ul className="scrollbar-none relative max-h-96 min-h-60 overflow-hidden overflow-y-auto rounded">
                            <li className="sticky top-0 flex items-center justify-between bg-black px-2 py-3 text-white">
                                <span>Tên phim</span>
                                <span>Thời gian cập nhật</span>
                            </li>

                            {statistical_data?.new_update_movie?.map((movie) => (
                                <li
                                    className="flex items-center justify-between px-2 py-3 hover:bg-[#e5e7e9]"
                                    key={movie.movie_name}
                                >
                                    <span>{movie.movie_name}</span>
                                    <span className="text-sm text-gray-500">{convertTime(movie.updated_at)}</span>
                                </li>
                            ))}
                        </ul>
                    </Loading>
                </div>
            </div>
        </Fragment>
    );
}
