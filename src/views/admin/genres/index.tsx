"use client";
import { GenresService } from "@/domain/the-loai/service";
import { Table } from "antd";
import { ChangeEvent, Fragment, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "@/infrastructure/styles/table.ant.css";
import { IDataCreateGenres, IDataUpdateGenres } from "@/domain/the-loai/model";
import { toast } from "react-toastify";
import Input from "@/base/libs/input/page";
import Loading from "@/base/libs/loading";
import { ModalMotion } from "@/base/libs/modal";

const initGenre: IDataCreateGenres | IDataUpdateGenres = { name: "", slug: "" };

export default function GenresAdminView() {
    const {
        data: genres,
        refetch: refetchGenres,
        createEGenreMutation,
        updateGenreMutation,
        isPeddingCreateGenre,
        isPeddingUpdateGenre
    } = GenresService.useGenres();

    const [ModalCreateOrUpdateGenre, setModalCreateOrUpdateGenre] = useState<boolean>(false);
    const [genre, setGenre] = useState<IDataCreateGenres | IDataUpdateGenres>(initGenre);
    const [message, setMessage] = useState<string>("");

    const isTypeUpdateGenre = useMemo(() => "id" in genre && genre.id !== undefined, [genre]);

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
                    setModalCreateOrUpdateGenre(false);
                    refetchGenres();
                }
            });
        } else {
            setMessage("Vui lòng điền đầy đủ thông tin!");
        }
    };

    const handleUpdateGenre = () => {
        if (isTypeUpdateGenre && genre.name && genre.slug) {
            const _genre = { ...genre } as IDataUpdateGenres;
            updateGenreMutation(
                { genre_id: _genre.id, data: _genre },
                {
                    onSuccess: () => {
                        toast.success("Cập nhật thể loại thành công!");
                        setGenre(initGenre);
                        setModalCreateOrUpdateGenre(false);
                    },
                    onError: () => {
                        toast.error("Có lỗi xảy ra!");
                    }
                }
            );
        } else {
            setMessage("Vui bạn điền đầy đủ thông tin!");
        }
    };

    const columns = [
        {
            title: "Tên thể loại",
            dataIndex: "name",
            key: "genre_name",
            width: "45%"
        },
        {
            title: "Đường dẫn tĩnh",
            dataIndex: "slug",
            key: "slug",
            width: "45%"
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: IDataUpdateGenres) => (
                <div className="flex items-center gap-x-1">
                    <button
                        className="flex items-center gap-x-1 rounded p-1 hover:text-admin_primary"
                        onClick={() => {
                            setGenre(record);
                            setModalCreateOrUpdateGenre(true);
                        }}
                    >
                        <FaRegEdit size={15} /> Sửa
                    </button>
                </div>
            )
        }
    ];

    return (
        <Fragment>
            <h1 className="text-center text-3xl font-semibold">Quản lý thể loại</h1>
            <button
                className="mb-2 mt-3 rounded bg-admin_primary px-3 py-2 text-white"
                onClick={() => setModalCreateOrUpdateGenre(true)}
            >
                Thêm thể loại
            </button>

            <Table
                dataSource={genres ? genres.data : []}
                columns={columns}
                loading={{
                    spinning: !genres?.data,
                    indicator: <Loading loading={!genres?.data} containerClassName="pt-20" />
                }}
                pagination={{
                    position: ["bottomCenter"]
                }}
                bordered
            />

            {/* Modal thêm thể loại hoặc cập nhật thể loại */}
            <ModalMotion
                textHeader={isTypeUpdateGenre ? "Cập nhật thể loại" : "Thêm thể loại"}
                onClose={() => {
                    setModalCreateOrUpdateGenre(false);
                    setMessage("");
                    setGenre(initGenre);
                }}
                onOk={() => {
                    isTypeUpdateGenre ? handleUpdateGenre() : handleCreateGenre();
                }}
                isOpen={ModalCreateOrUpdateGenre}
                textOk={isTypeUpdateGenre ? "Cập nhật" : "Tạo"}
                loading={isPeddingCreateGenre || isPeddingUpdateGenre}
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
            </ModalMotion>
        </Fragment>
    );
}
