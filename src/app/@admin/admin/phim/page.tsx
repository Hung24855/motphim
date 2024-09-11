"use client";

import Link from "next/link";

import { ConfigProvider, Table } from "antd";
import { MoviesService } from "@/domain/phim/services";
const dataSource = [
    {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street"
    },
    {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street"
    }
];

const columns = [
    {
        title: "Tên",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Tuổi",
        dataIndex: "age",
        key: "age"
    },
    {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address"
    }
];

export default function MovieManagement() {
    const { data } = MoviesService.use_movies();
    // console.log("data: ", data);

    return (
        <div>
            <h1 className="text-xl font-semibold">Quản lý phim</h1>
            <Link href={"/admin/phim/them-phim"}>
                <button className="rounded bg-[#7c69ef] px-3 py-2 text-white">Thêm phim</button>
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
                    <Table dataSource={dataSource} columns={columns} />
                </ConfigProvider>
            </div>
        </div>
    );
}
