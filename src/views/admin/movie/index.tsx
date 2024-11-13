"use client";
import Link from "next/link";
import { Table, Tag } from "antd";
import { MoviesService } from "@/domain/phim/services";
import { useState } from "react";
import { FaRegEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import "@/infrastructure/styles/table.ant.css";
import Loading from "@/base/libs/loading";
import { ModalMotion } from "@/base/libs/modal";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { TResGetMovies } from "@/domain/phim/model";
import useDebounce from "@/base/hooks/useDebounce";
import { convertSearchParams } from "@/utils/function";

export default function MoviesAdminView() {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowModalDeleteMovie, setIsShowModalDeleteMovie] = useState<boolean>(false);
    const [movieSelect, setMovieSelect] = useState<{ movie_id: string; name: string; is_visible: boolean } | null>(
        null
    );
    const {
        data: movies,
        isFetching,
        isPeddingDeleteMovie,
        deleteMovieMutation
    } = MoviesService.use_movies({ page: page, limit: 10 });
    const { isPendingChangeVisibleMovie, mutateChangeVisibleMovie } = MoviesService.change_visible_movie();

    //Tìm kiếm phim  -- 25/10/2024 : 10h48
    const [searchText, setsearchText] = useState<string>("");
    const debouncedValue = useDebounce(searchText, 1000);
    const {
        data: moviesSearch,
        isFetching: isFetchingSearch,
        refetch
    } = MoviesService.get_search_movie({
        query: convertSearchParams(debouncedValue)
    });
    //End kiếm phim

    const columns = [
        {
            title: "Tên phim",
            dataIndex: "movie_name",
            key: "movie_name"
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (src: string) => <img src={src} alt="" className="h-24 w-20" />
        },
        {
            title: "Năm xuất bản",
            dataIndex: "year",
            key: "year"
        },
        {
            title: "Thời gian mỗi tập",
            dataIndex: "time_per_episode",
            key: "time_per_episode"
        },
        {
            title: "Ngôn ngữ",
            dataIndex: "lang",
            key: "lang"
        },
        {
            title: "Thể loại",
            key: "tags",
            dataIndex: "movie_type_id",
            render: (movie_type: "type1" | "type2") => {
                if (movie_type === "type1") {
                    return <Tag color="gold">Phim bộ</Tag>;
                } else {
                    return <Tag color="green">Phim lẻ</Tag>;
                }
            }
        },
        {
            title: "Tập hiện tại",
            dataIndex: "episode_current",
            key: "episode_current"
        },
        {
            title: "Tổng số tập",
            dataIndex: "episode_total",
            key: "episode_total"
        },

        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: any) => (
                <div className="flex items-center gap-x-1">
                    <button
                        className="flex items-center gap-x-1 rounded p-1"
                        onClick={() => {
                            setIsShowModal(true);
                            setMovieSelect({
                                movie_id: record.id,
                                name: record.movie_name,
                                is_visible: record?.is_visible
                            });
                        }}
                    >
                        {record.is_visible ? (
                            <span className="flex items-center gap-x-1 text-green-500">
                                <FaEye size={15} /> Ẩn
                            </span>
                        ) : (
                            <span className="flex items-center gap-x-1 text-red-500">
                                <FaEyeSlash size={15} /> Hiện
                            </span>
                        )}
                    </button>
                    <Link href={`/admin/phim/sua/${record.slug}`} className="text-admin_primary">
                        <button className="flex items-center gap-x-1 rounded p-1">
                            <FaRegEdit size={15} /> Sửa
                        </button>
                    </Link>
                    <button
                        className="flex items-center gap-x-1 rounded p-1 text-red-500"
                        onClick={() => {
                            setIsShowModalDeleteMovie(true);
                            setMovieSelect({
                                movie_id: record.id,
                                name: record.movie_name,
                                is_visible: record?.is_visible
                            });
                        }}
                    >
                        <IoTrashBinSharp size={15} /> Xóa
                    </button>
                </div>
            )
        }
    ];

    const handleChangeIsVisibleMovie = () => {
        if (movieSelect) {
            mutateChangeVisibleMovie(
                { movie_id: movieSelect.movie_id, is_visible: !movieSelect.is_visible },
                {
                    onSuccess(data) {
                        toast.success("Cập nhật hiện thị thành công.");
                        setIsShowModal(false);
                        setMovieSelect(null);

                        if (moviesSearch) {
                            refetch();
                        } else {
                            queryClient.setQueryData([QUERY_KEY.GET_LIST_MOVIES, page], (prevData: TResGetMovies) => ({
                                ...prevData,
                                data: prevData.data.map((movie) => ({
                                    ...movie,
                                    is_visible: movie.id === data.id ? data.is_visible : movie.is_visible
                                }))
                            }));
                        }
                    },
                    onError(e) {}
                }
            );
        }
    };

    const handleDeleteMovie = () => {
        if (movieSelect) {
            deleteMovieMutation(movieSelect.movie_id, {
                onSuccess(data) {
                    toast.success("Xóa phim thành công.!");
                    setIsShowModalDeleteMovie(false);
                    setMovieSelect(null);
                    if (moviesSearch) {
                        refetch();
                    } else {
                        queryClient.setQueryData([QUERY_KEY.GET_LIST_MOVIES, page], (prevData: TResGetMovies) => ({
                            ...prevData,
                            data: prevData.data.filter((movie) => movie.id !== data.id)
                        }));
                    }
                },
                onError(e) {}
            });
        }
    };

    return (
        <div>
            <h1 className="text-center text-3xl font-semibold">Quản lý phim</h1>
            <div className="flex gap-4">
                <Link href={"/admin/phim/them-phim"}>
                    <button className="rounded bg-admin_primary px-3 py-2 text-white">Thêm phim</button>
                </Link>
                <div className="h-10 w-52">
                    <input
                        placeholder="Nhập tên phim ..."
                        className="rounded-sm border p-2 outline-none"
                        value={searchText}
                        onChange={(e: any) => {
                            setsearchText(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="mt-3 min-h-screen w-full">
                <Table
                    dataSource={moviesSearch ? moviesSearch : movies?.data}
                    columns={columns}
                    loading={{
                        spinning: isFetching || isFetchingSearch,
                        indicator: <Loading loading={isFetching || isFetchingSearch} containerClassName="pt-20 " />
                    }}
                    pagination={{
                        pageSize: 10,
                        total: moviesSearch ? 1 : movies?.pagination ? movies.pagination.totalRows : 1,
                        onChange: (page) => setPage(page),
                        position: ["bottomCenter"]
                    }}
                    // bordered
                />
            </div>

            {/* Modal ẩn phim */}
            <ModalMotion
                textHeader="Xác nhận ẩn phim"
                onClose={() => {
                    setIsShowModal(false);
                    setMovieSelect(null);
                }}
                onOk={handleChangeIsVisibleMovie}
                isOpen={isShowModal}
                textOk={movieSelect?.is_visible ? "Ẩn" : "Hiện"}
                loading={isPendingChangeVisibleMovie}
                modalContainerClassName="!gap-y-4"
                okButtonClassName="!bg-admin_primary !text-white"
            >
                {movieSelect?.is_visible
                    ? `Bạn có chắc chắn muốn ẩn phim "${movieSelect?.name}" không ?`
                    : `Bạn có chắc chắn muốn hiện thị phim "${movieSelect?.name}" không ?`}
            </ModalMotion>

            {/* Modal xóa phim */}
            <ModalMotion
                textHeader="Xác nhận xóa phim"
                onClose={() => {
                    setIsShowModalDeleteMovie(false);
                    setMovieSelect(null);
                }}
                onOk={handleDeleteMovie}
                isOpen={isShowModalDeleteMovie}
                textOk="Xóa"
                loading={isPeddingDeleteMovie}
                modalContainerClassName="!gap-y-4"
                okButtonClassName="!bg-red-500 !text-white"
            >
                {`Bạn có chắc chắn muốn xóa phim "${movieSelect?.name}" không ?`}
            </ModalMotion>
        </div>
    );
}
