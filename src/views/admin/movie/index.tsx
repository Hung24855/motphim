"use client";
import { useState } from "react";
import Link from "next/link";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaRegEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { Table, Tag } from "antd";
import { MoviesService } from "@/domain/phim/services";
import "@/infrastructure/styles/table.ant.css";
import Loading from "@/base/libs/loading";
import useDebounce from "@/base/hooks/useDebounce";
import { convertSearchParams } from "@/utils/function";
import FilterMovies from "./components/FilterMovies";
import ModalHideOrVisibleMovie from "./components/ModalHideOrVisibleMovie";
import ModalDeleteMovie from "./components/ModalDeleteMovie";
import ModalDeleteMutibleMovie from "./components/ModalDeleteMutibleMovie";

export default function MoviesAdminView() {
    const [page, setPage] = useState(1);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowModalDeleteMovie, setIsShowModalDeleteMovie] = useState<boolean>(false);
    const [isShowModalDeleteMultibleMovie, setIsShowModalDeleteMultibleMovie] = useState<boolean>(false);
    const [filterType, setFilterType] = useState<{ type?: "type1" | "type2"; genre: string; country: string }>({
        genre: "",
        country: ""
    });
    const [movieSelect, setMovieSelect] = useState<{ movie_id: string; name: string; is_visible: boolean } | null>(
        null
    );
    const [mutibleChoisedRow, setMutibleChoseRow] = useState<string[]>([]);
    const {
        data: movies,
        isFetching,
        isPeddingDeleteMovie,
        deleteMovieMutation,
        mutateAsyncDeleteMovie
    } = MoviesService.use_movies({
        page: page,
        limit: 10,
        movie_type_id: filterType?.type,
        country: filterType?.country,
        genre: filterType?.genre
    });

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
            title: "Loại phim",
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
                        className="h-full rounded-sm border px-2 outline-none"
                        value={searchText}
                        onChange={(e: any) => {
                            setsearchText(e.target.value);
                        }}
                    />
                </div>
                <FilterMovies filterType={filterType} setFilterType={setFilterType} />

                {mutibleChoisedRow.length > 0 && (
                    <button
                        className="ml-auto rounded bg-red-500 px-3 py-2 text-white"
                        onClick={() => setIsShowModalDeleteMultibleMovie(true)}
                    >
                        Xóa danh sách
                    </button>
                )}
            </div>

            <div className="mt-3 min-h-screen w-full">
                <Table
                    dataSource={moviesSearch ? moviesSearch : movies?.data}
                    columns={columns}
                    rowSelection={{
                        type: "checkbox",
                        onChange: (selectedRowKeys) => {
                            setMutibleChoseRow(selectedRowKeys as string[]);
                        }
                    }}
                    rowKey={(record) => record.id}
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
                />
            </div>

            {/* Modal ẩn phim */}
            <ModalHideOrVisibleMovie
                filterType={filterType}
                isShowModal={isShowModal}
                movieSelect={movieSelect}
                moviesSearch={moviesSearch}
                page={page}
                refetch={refetch}
                setIsShowModal={setIsShowModal}
                setMovieSelect={setMovieSelect}
            />

            {/* Modal xóa phim */}
            <ModalDeleteMovie
                deleteMovieMutation={deleteMovieMutation}
                movieSelect={movieSelect}
                moviesSearch={moviesSearch}
                refetch={refetch}
                filterType={filterType}
                page={page}
                setIsShowModalDeleteMovie={setIsShowModalDeleteMovie}
                setMovieSelect={setMovieSelect}
                isPeddingDeleteMovie={isPeddingDeleteMovie}
                isShowModalDeleteMovie={isShowModalDeleteMovie}
            />

            {/* Modal xóa phim */}
            <ModalDeleteMutibleMovie
                filterType={filterType}
                page={page}
                setIsShowModalDeleteMultibleMovie={setIsShowModalDeleteMultibleMovie}
                isShowModalDeleteMultibleMovie={isShowModalDeleteMultibleMovie}
                isPeddingDeleteMovie={isPeddingDeleteMovie}
                moviesSearch={moviesSearch}
                mutateAsyncDeleteMovie={mutateAsyncDeleteMovie}
                refetch={refetch}
                setMutibleChoseRow={setMutibleChoseRow}
                mutibleChoisedRow={mutibleChoisedRow}
            />
        </div>
    );
}
