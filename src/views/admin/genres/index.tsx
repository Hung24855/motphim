"use client";
import { GenresService } from "@/domain/the-loai/service";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Table } from "antd";
import { ChangeEvent, Fragment, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "@/infrastructure/styles/table.ant.css";
import Modal from "@/base/libs/modal";
import { IDataCreateGenres } from "@/domain/the-loai/model";
import { toast } from "react-toastify";
import Input from "@/base/libs/input/page";

const columns = [
    {
        title: "Tên thể loại",
        dataIndex: "name",
        key: "genre_name"
    },
    {
        title: "Đường dẫn tĩnh",
        dataIndex: "slug",
        key: "slug"
    },
    {
        title: "Hành động",
        key: "action",
        render: (_: any, record: any) => (
            <div className="flex items-center gap-x-1">
                <button className="flex items-center gap-x-1 rounded p-1 hover:text-admin_primary">
                    <FaRegEdit size={15} /> Sửa
                </button>
            </div>
        )
    }
];
const initGenre: IDataCreateGenres = { name: "", slug: "" };

export default function GenresAdminView() {
    const {
        data: genres,
        refetch: refetchGenres,
        createEGenreMutation,
        isPeddingCreateGenre
    } = GenresService.useGenres();

    const [ModalCreateGenre, setModalCreateGenre] = useState<boolean>(false);
    const [genre, setGenre] = useState<IDataCreateGenres>(initGenre);
    const [message, setMessage] = useState<string>("");

    const handleCreateGenre = () => {
        if (genre && genre.name && genre.slug) {
            createEGenreMutation({
                data: genre,
                onError: () => {
                    toast.error("Có lỗi xảy ra!");
                },
                onSuccess: () => {
                    toast.success("Thêm thể loại thành công!");
                    setGenre(initGenre);
                    setModalCreateGenre(false);
                    refetchGenres();
                }
            });
        } else {
            setMessage("Vui lòng điền đầy đủ thông tin!");
        }
    };

    return (
        <Fragment>
            <h1 className="text-3xl font-semibold">Quản lý thể loại</h1>
            <button
                className="mb-2 mt-3 rounded bg-admin_primary px-3 py-2 text-white"
                onClick={() => setModalCreateGenre(true)}
            >
                Thêm thể loại
            </button>
            <Table
                dataSource={genres ? genres.data : []}
                columns={columns}
                loading={{
                    spinning: !genres?.data,
                    indicator: <Spin size="large" indicator={<LoadingOutlined spin />} />
                }}
                pagination={{
                    position: ["bottomCenter"]
                }}
            />

            {/* Modal thêm thể loại */}
            <Modal
                textHeader="Thêm thể loại"
                onClose={() => {
                    setModalCreateGenre(false);
                    setMessage("");
                    setGenre(initGenre);
                }}
                onOk={() => {
                    handleCreateGenre();
                }}
                isOpen={ModalCreateGenre}
                textOk="Thêm"
                loading={isPeddingCreateGenre}
                okButtonClassName="!bg-admin_primary"
                modalContainerClassName="!top-20 w-[500px]"
                headerModalClassName="text-center text-xl"
            >
                <Input
                    label="Tên thể loại"
                    placeholder="VD: Cổ trang"
                    value={genre.name}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGenre({ ...genre, name: e.target.value })}
                />
                <Input
                    label="Đường dẫn tĩnh"
                    placeholder="VD: co-trang"
                    value={genre.slug}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGenre({ ...genre, slug: e.target.value })}
                />
                <div className="text-red-500">{message}</div>
            </Modal>
        </Fragment>
    );
}
