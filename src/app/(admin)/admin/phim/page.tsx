"use client";
import Link from "next/link";
import { ConfigProvider, Spin, Table } from "antd";
import { MoviesService } from "@/domain/phim/services";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

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
        title: "Action",
        key: "action",
        render: (_: any, record: any) => (
            <div className="flex gap-x-1">
                <button className="rounded bg-blue-500 px-3 py-2 text-white">Ẩn</button>
                <Link href={`/admin/phim/sua/${record.slug}`}>
                    <button className="rounded bg-green-500 px-3 py-2 text-white">Sửa</button>
                </Link>
                <button className="rounded bg-red-500 px-3 py-2 text-white">Xóa</button>
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
                <button className="mt-3 rounded bg-[#7c69ef] px-3 py-2 text-white">Thêm phim</button>
            </Link>
            <div className="mt-3">
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: "#fafafa"
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
