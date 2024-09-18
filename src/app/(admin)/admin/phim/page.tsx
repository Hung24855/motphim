"use client";
import Link from "next/link";
import { ConfigProvider, Spin, Table, Tag } from "antd";
import { MoviesService } from "@/domain/phim/services";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import "@/infrastructure/styles/table.ant.css";

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
        render: (text: string) => <img src={text} alt="" className="h-24 w-20" />
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
                <button className="flex items-center gap-x-1 rounded p-1">
                    <FaEye size={15} /> Ẩn
                </button>
                <Link href={`/admin/phim/sua/${record.slug}`} className="hover:text-admin_primary">
                    <button className="flex items-center gap-x-1 rounded p-1">
                        <FaRegEdit size={15} /> Sửa
                    </button>
                </Link>
                <button className="flex items-center gap-x-1 rounded p-1">
                    <IoTrashBinSharp size={15} /> Xóa
                </button>
            </div>
        )
    }
];

export default function MovieManagement() {
    const [page, setPage] = useState(1);
    const { data: movies } = MoviesService.use_movies({ page: page, limit: 10 });

    return (
        <div>
            <h1 className="text-3xl font-semibold">Quản lý phim</h1>
            <Link href={"/admin/phim/them-phim"}>
                <button className="bg-admin_primary mb-1 mt-3 rounded px-3 py-2 text-white">Thêm phim</button>
            </Link>
            <div className="mt-3">
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: "#f3f4f6"
                            }
                        }
                    }}
                >
                    <Table
                        dataSource={movies?.data}
                        columns={columns}
                        loading={{
                            spinning: !movies,
                            indicator: <Spin size="large" indicator={<LoadingOutlined spin />} />,
                            tip: "Đang tải dữ liệu..." // Custom message
                        }}
                        pagination={{
                            pageSize: 10,
                            total: movies?.pagination.totalRows,
                            onChange: (page) => setPage(page),
                            position: ["bottomCenter"]
                        }}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
}
