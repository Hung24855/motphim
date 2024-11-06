"use client";
import Button from "@/base/libs/button";
import { TResGetMovieCrawl } from "@/domain/crawler/model";
import { CrawlerService } from "@/domain/crawler/services";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CrawlerView() {
    const [enabled, setEnabled] = useState(false);
    const [pageRange, setPageRange] = useState<{ start: number | string; end: number | string }>({ start: 1, end: 1 });
    const [movies, setMovies] = useState<TResGetMovieCrawl>([]);
    const [checkedMovies, setCheckedMovies] = useState<{ [key: string]: boolean }>({});
    const [loadingUpdateMovies, setLoadingUpdateMovies] = useState(false);
    const [updatingMovie, setUpdatingMovie] = useState<{ [key: string]: boolean }>({}); // Thêm trạng thái loading cho từng phim

    const { data, isFetching, mutateAsyncUpdateDataCrawl } = CrawlerService.useCrawlData({
        enabled,
        params: pageRange
    });

    useEffect(() => {
        if (data) {
            setMovies(data);
            setEnabled(false);
            const initialCheckedState = data.reduce(
                (acc, movie) => {
                    acc[movie.slug] = true;
                    return acc;
                },
                {} as { [key: string]: boolean }
            );
            setCheckedMovies(initialCheckedState);
        }
    }, [data]);

    const handleCheckboxChange = (slug: string) => {
        setCheckedMovies((prev) => ({
            ...prev,
            [slug]: !prev[slug]
        }));
    };

    const getCheckedMovies = () => {
        return movies.filter((movie) => checkedMovies[movie.slug]);
    };

    const handleUpdateMovies = async () => {
        const checkedMoviesList = getCheckedMovies();
        if (checkedMoviesList.length === 0) return;
        setLoadingUpdateMovies(true);
        try {
            const promises = checkedMoviesList.map(async (movie) => {
                setUpdatingMovie((prev) => ({ ...prev, [movie.slug]: true }));
                await mutateAsyncUpdateDataCrawl(movie);
                setUpdatingMovie((prev) => ({ ...prev, [movie.slug]: false }));
            });

            await Promise.all(promises);
        } catch (error) {
            console.error("Có lỗi xảy ra trong quá trình cập nhật:", error);
        } finally {
            toast.success("Cập nhật phim thành công!");
            setLoadingUpdateMovies(false);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center text-3xl font-semibold">Crawl data từ OPHIM</h1>
            <div className="mt-2 flex items-center gap-x-3">
                <Button onClick={() => setEnabled(true)} loading={isFetching} buttonClassName="!bg-admin_primary">
                    Lấy danh sách phim
                </Button>
                <span>Từ trang:</span>
                <input
                    type="number"
                    className="h-10 border px-1 outline-none"
                    value={pageRange.start || ""}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPageRange({
                            ...pageRange,
                            start: value === "" ? "" : Number(value)
                        });
                    }}
                />
                <span>Đến trang:</span>
                <input
                    type="number"
                    className="h-10 border px-1 outline-none"
                    value={pageRange.end || ""}
                    onChange={(e) => {
                        const value = e.target.value;
                        setPageRange({
                            ...pageRange,
                            end: value === "" ? "" : Number(value)
                        });
                    }}
                />
                {/* <span>Tìm kiếm:</span>
                <div className="h-10 w-52">
                    <input
                        placeholder="Nhập tên phim ..."
                        className="rounded-sm border p-2 outline-none"
                        // value={searchText}
                        // onChange={(e: any) => {
                        //     setsearchText(e.target.value);
                        // }}
                    />
                </div> */}
            </div>
            {/* Danh sách phim */}
            <div className="my-2 h-[70vh] w-full border bg-white p-2">
                {movies.length > 0 && (
                    <Fragment>
                        <div className="mr-5 flex-1 text-2xl font-semibold">
                            Đã chọn : {Object.values(checkedMovies).filter(Boolean).length}/{movies.length} phim
                        </div>
                        <div className="mt-2 h-[calc(100%-35px)] w-full overflow-hidden overflow-y-scroll">
                            <div className="grid w-full grid-cols-2 gap-2 p-1">
                                {movies.map((movie) => {
                                    return (
                                        <div className="flex gap-x-40" key={movie.slug}>
                                            <div className="flex gap-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={movie.slug}
                                                    checked={checkedMovies[movie.slug] || false}
                                                    onChange={() => handleCheckboxChange(movie.slug)}
                                                />
                                                <label
                                                    htmlFor={movie.slug}
                                                    className="line-clamp-1 max-w-[350px] cursor-pointer"
                                                >
                                                    {movie.movie_name}
                                                </label>
                                            </div>

                                            {checkedMovies[movie.slug] &&
                                                (updatingMovie[movie.slug] ? (
                                                    <span className="mr-10 flex-1 text-end text-blue-500">
                                                        Đang cập nhật...
                                                    </span>
                                                ) : (
                                                    <span className="mr-10 flex-1 text-end text-green-500">OK</span>
                                                ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
            <Button buttonClassName="!bg-admin_primary" onClick={handleUpdateMovies} loading={loadingUpdateMovies}>
                Cập nhật
            </Button>
        </Fragment>
    );
}
