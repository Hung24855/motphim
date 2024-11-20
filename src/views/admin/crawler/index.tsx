"use client";
import Button from "@/base/libs/button";
import { TResGetMovieCrawl, TResGetSearchMovieCrawl } from "@/domain/crawler/model";
import { CrawlerService } from "@/domain/crawler/services";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/base/libs/loading";

export default function CrawlerView() {
    const [enabled, setEnabled] = useState(false);
    const [pageRange, setPageRange] = useState<{ start: number | string; end: number | string }>({ start: 1, end: 1 });
    const [movies, setMovies] = useState<TResGetMovieCrawl>([]);
    const [checkedMovies, setCheckedMovies] = useState<{ [key: string]: boolean }>({});
    const [loadingUpdateMovies, setLoadingUpdateMovies] = useState(false); //Loading tổng
    const [moviesUpdateSuccess, setMoviesUpdateSuccess] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    const { data, isFetching, mutateAsyncUpdateDataCrawl, mutateSearchDataCrawl, isPendingSearch } =
        CrawlerService.useCrawlData({
            enabled,
            params: pageRange
        });

    useEffect(() => {
        if (data) {
            handlCheckAndUncheckAll(data);
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
            await Promise.all(
                checkedMoviesList.map(async (movie) => {
                    await mutateAsyncUpdateDataCrawl(movie);
                    setMoviesUpdateSuccess((prev) => [...prev, movie.slug]);
                })
            );
        } catch (error) {
            console.error("Có lỗi xảy ra trong quá trình cập nhật:", error);
        } finally {
            toast.success("Cập nhật phim thành công!");
            setLoadingUpdateMovies(false);
        }
    };

    const handleGetMovieSearch = async () => {
        if (!searchText) return;
        const query = searchText.trim().replaceAll(" ", "+");
        mutateSearchDataCrawl(query, {
            onSuccess: (data) => {
                if (data) {
                    handlCheckAndUncheckAll(data);
                }
            }
        });
    };

    const handlCheckAndUncheckAll = (data: TResGetSearchMovieCrawl) => {
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
    };

    return (
        <Fragment>
            <h1 className="text-center text-3xl font-semibold">Crawl data từ OPHIM</h1>
            <div className="mt-2 flex flex-col flex-wrap gap-3 md:flex-row md:items-center">
                <Button onClick={() => setEnabled(true)} loading={isFetching} buttonClassName="!bg-admin_primary">
                    Lấy danh sách phim
                </Button>
                <div className="flex flex-col md:flex-row md:items-center">
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
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
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
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                    <span>Tìm kiếm:</span>
                    <input
                        placeholder="Nhập tên phim ..."
                        className="h-10 border px-1 outline-none"
                        value={searchText}
                        onChange={(e: any) => {
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                                handleGetMovieSearch();
                            }
                        }}
                    />
                </div>
            </div>
            {/* Danh sách phim */}
            <Loading loading={isFetching || isPendingSearch} containerClassName="!bg-black/10">
                <div className="my-2 h-[70vh] w-full border bg-white p-2">
                    {movies.length > 0 && (
                        <Fragment>
                            <div className="mr-5 flex-1 text-2xl font-semibold">
                                Đã chọn : {Object.values(checkedMovies).filter(Boolean).length}/{movies.length} phim
                            </div>
                            <div className="mt-2 h-[calc(100%-35px)] w-full overflow-hidden overflow-y-scroll">
                                <div className="grid w-full grid-cols-1 gap-2 p-1 md:grid-cols-2">
                                    {movies.map((movie) => {
                                        return (
                                            <div className="flex justify-between" key={movie.slug}>
                                                <div className="flex gap-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={movie.slug}
                                                        checked={checkedMovies[movie.slug] || false}
                                                        onChange={() => handleCheckboxChange(movie.slug)}
                                                    />
                                                    <label
                                                        htmlFor={movie.slug}
                                                        className="line-clamp-1 max-w-[200px] cursor-pointer md:max-w-[350px]"
                                                    >
                                                        {movie.movie_name}
                                                    </label>
                                                </div>

                                                {checkedMovies[movie.slug] &&
                                                    (loadingUpdateMovies &&
                                                    !moviesUpdateSuccess.find((item) => item === movie.slug) ? (
                                                        <span className="mr-10 flex-1 text-end text-blue-500">
                                                            Process...
                                                        </span>
                                                    ) : moviesUpdateSuccess.find((item) => item === movie.slug) ? (
                                                        <span className="mr-10 flex-1 text-end text-green-500">OK</span>
                                                    ) : null)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Fragment>
                    )}
                </div>
            </Loading>
            <Button buttonClassName="!bg-admin_primary" onClick={handleUpdateMovies} loading={loadingUpdateMovies}>
                Cập nhật
            </Button>
        </Fragment>
    );
}
