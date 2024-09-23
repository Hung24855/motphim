"use client";
import Link from "next/link";
import { Table, Tag } from "antd";
import { MoviesService } from "@/domain/phim/services";
import { Fragment, useState } from "react";
import { FaRegEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import "@/infrastructure/styles/table.ant.css";
import Loading from "@/base/libs/loading";
import { ModalMotion } from "@/base/libs/modal";
import { toast } from "react-toastify";
import { set } from "zod";

export default function MoviesAdminView() {
    const [page, setPage] = useState(1);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [isShowModalDeleteMovie, setIsShowModalDeleteMovie] = useState<boolean>(false);
    const [movieSelect, setMovieSelect] = useState<{ movie_id: string; name: string; is_visible: boolean } | null>(
        null
    );
    const {
        data: movies,
        isFetching,
        refetchMovies,
        isPeddingDeleteMovie,
        deleteMovieMutation
    } = MoviesService.use_movies({ page: page, limit: 10 });
    const { isPendingChangeVisibleMovie, mutateChangeVisibleMovie } = MoviesService.change_visible_movie();

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
                    return <Tag color="geekblue">Phim bộ</Tag>;
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
            mutateChangeVisibleMovie({
                data: { movie_id: movieSelect.movie_id, is_visible: !movieSelect.is_visible },
                onSuccess(data) {
                    if (data.status === "success") {
                        toast.success(data.message);
                        setIsShowModal(false);
                        setMovieSelect(null);
                        refetchMovies();
                    }
                },
                onError(e) {
                    toast.error("Có lỗi xảy ra thử lại sau!");
                }
            });
        }
    };

    const handleDeleteMovie = () => {
        if (movieSelect) {
            deleteMovieMutation({
                id: movieSelect.movie_id,
                onSuccess(data) {
                    if (data.status === "success") {
                        toast.success(data.message);
                        setIsShowModalDeleteMovie(false);
                        setMovieSelect(null);
                        refetchMovies();
                    }
                },
                onError(e) {
                    toast.error("Có lỗi xảy ra thử lại sau!");
                }
            });
        }
    };
    return (
        <div>
            <h1 className="text-center text-3xl font-semibold">Quản lý phim</h1>
            <Link href={"/admin/phim/them-phim"}>
                <button className="mb-1 mt-3 rounded bg-admin_primary px-3 py-2 text-white">Thêm phim</button>
            </Link>
            <div className="mt-3 min-h-screen w-full">
                <Table
                    dataSource={movies?.data}
                    columns={columns}
                    loading={{
                        spinning: isFetching,
                        indicator: <Loading loading={isFetching} containerClassName="pt-20 " />
                    }}
                    pagination={{
                        pageSize: 10,
                        total: movies?.pagination.totalRows,
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
