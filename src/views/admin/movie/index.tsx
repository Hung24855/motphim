"use client";
import { Fragment, useState } from "react";
import Link from "next/link";
import { Table, Tag, Tooltip } from "antd";
import { MoviesService } from "@/domain/phim/services";
import "@/infrastructure/styles/table.ant.css";
import Loading from "@/base/libs/loading";
import useDebounce from "@/base/hooks/useDebounce";
import { convertSearchParams } from "@/utils/function";
import FilterMovies from "./components/FilterMovies";
import ModalHideOrVisibleMovie from "./components/ModalHideOrVisibleMovie";
import ModalDeleteMovie from "./components/ModalDeleteMovie";
import ModalDeleteMutibleMovie from "./components/ModalDeleteMutibleMovie";
import { ColumnProps } from "antd/es/table";
import { BrushSquare, Eye, EyeSlash, CloseSquare } from "iconsax-react";

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
    const columns: ColumnProps[] = [
        {
            title: "Tên phim",
            dataIndex: "movie_name",
            key: "movie_name",
            fixed: "left",
            width: 350,
            render: (movie_name: string) => <div className="line-clamp-1">{movie_name}</div>
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (src: string) => <img src={src} alt="" className="h-24 w-20" />
        },
        {
            title: "Năm",
            dataIndex: "year",
            key: "year",
            align: "center"
        },
        {
            title: "Thời gian",
            dataIndex: "time_per_episode",
            key: "time_per_episode",
            align: "center"
        },
        {
            title: "Ngôn ngữ",
            dataIndex: "lang",
            key: "lang",
            align: "center"
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
            },
            align: "center"
        },
        {
            title: "Tập hiện tại",
            dataIndex: "episode_current",
            key: "episode_current",
            align: "center"
        },
        {
            title: "Tổng số tập",
            dataIndex: "episode_total",
            key: "episode_total",
            align: "center"
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
                                <Tooltip title="Ẩn">
                                    <Eye size={18} />
                                </Tooltip>
                            </span>
                        ) : (
                            <span className="flex items-center gap-x-1 text-red-500">
                                <Tooltip title="Hiện">
                                    <EyeSlash size={18} />
                                </Tooltip>
                            </span>
                        )}
                    </button>
                    <Link href={`/admin/phim/sua/${record.slug}`} className="text-admin_primary">
                        <button className="flex items-center gap-x-1 rounded p-1">
                            <Tooltip title="Sửa">
                                <BrushSquare size={18} className="text-info" />
                            </Tooltip>
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
                        <Tooltip title="Xóa">
                            <CloseSquare size={18} />
                        </Tooltip>
                    </button>
                </div>
            ),
            fixed: "right",
            align: "center"
        }
    ];

    return (
        <div className="h-screen">
            <h1 className="text-center text-3xl font-semibold">Quản lý phim</h1>
            <div className="flex flex-wrap gap-4">
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

            <div className="mt-3 w-full">
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
                        indicator: <Loading loading={isFetching || isFetchingSearch} />
                    }}
                    pagination={{
                        pageSize: 10,
                        total: moviesSearch ? 1 : movies?.pagination ? movies.pagination.totalRows : 1,
                        onChange: (page) => setPage(page),
                        position: ["bottomCenter"]
                    }}
                    scroll={{ y: 480 }}
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
