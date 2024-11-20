"use client";
import Input from "@/base/libs/input";
import Loading from "@/base/libs/loading";
import { ModalMotion } from "@/base/libs/modal";
import { DataCreateGenres, DataUpdateGenres, TResGetAllGenre } from "@/domain/the-loai/model";
import { GenresService } from "@/domain/the-loai/service";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import "@/infrastructure/styles/table.ant.css";
import { useQueryClient } from "@tanstack/react-query";
import { Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/es/table";
import { BrushSquare, CloseSquare } from "iconsax-react";
import { ChangeEvent, Fragment, useMemo, useState } from "react";
import { toast } from "react-toastify";

const initGenre: DataCreateGenres | DataUpdateGenres = { name: "", slug: "" };

export default function GenresAdminView() {
    const queryClient = useQueryClient();
    const {
        data: genres,
        createEGenreMutation,
        updateGenreMutation,
        deleteGenreMutation,
        isPeddingCreateGenre,
        isPeddingUpdateGenre,
        isPeddingDeleteGenre
    } = GenresService.useGenres();

    const [ModalCreateOrUpdateGenre, setModalCreateOrUpdateGenre] = useState<boolean>(false);
    const [ModalDeleteGenre, setModalDeleteGenre] = useState<boolean>(false);
    const [genre, setGenre] = useState<DataCreateGenres | DataUpdateGenres>(initGenre);
    const [message, setMessage] = useState<string>("");
    const [idDelete, setIdDelete] = useState<number | undefined>();

    const isTypeUpdateGenre = useMemo(() => "id" in genre && genre.id !== undefined, [genre]);

    const handleCreateGenre = () => {
        if (genre && genre.name && genre.slug) {
            createEGenreMutation({
                data: genre,
                onError: () => {},
                onSuccess: (data) => {
                    toast.success("Thêm thể loại thành công!");
                    setGenre(initGenre);
                    setModalCreateOrUpdateGenre(false);

                    const previousData = queryClient.getQueryData<TResGetAllGenre>([QUERY_KEY.GET_ALL_GENRES]);
                    if (previousData) {
                        queryClient.setQueryData<TResGetAllGenre>(
                            [QUERY_KEY.GET_ALL_GENRES],
                            [data[0], ...previousData]
                        );
                    }
                }
            });
        } else {
            setMessage("Vui lòng điền đầy đủ thông tin!");
        }
    };

    const handleUpdateGenre = () => {
        if (isTypeUpdateGenre && genre.name && genre.slug) {
            const _genre = { ...genre } as DataUpdateGenres;
            updateGenreMutation(
                { genre_id: _genre.id, data: _genre },
                {
                    onSuccess: () => {
                        toast.success("Cập nhật thể loại thành công!");
                        setGenre(initGenre);
                        setModalCreateOrUpdateGenre(false);
                    },
                    onError: () => {}
                }
            );
        } else {
            setMessage("Vui bạn điền đầy đủ thông tin!");
        }
    };

    const handleDeleteGenre = () => {
        if (idDelete)
            deleteGenreMutation(idDelete, {
                onSuccess: () => {
                    toast.success("Xóa thể loại thành công!");
                    setModalDeleteGenre(false);
                }
            });
    };

    const columns: ColumnProps<any>[] = [
        {
            title: "Tên thể loại",
            dataIndex: "name",
            key: "genre_name",
            width: 150
        },
        {
            title: "Đường dẫn tĩnh",
            dataIndex: "slug",
            key: "slug",
            width: 150
        },
        {
            title: "Số phim thuộc thể loại",
            key: "movie_count",
            align: "center",
            render: () => {
                return <Tag color="geekblue">Chưa cập nhật</Tag>;
            }
        },
        {
            title: "SEO Title",
            key: "movie_count",
            align: "center",
            render: () => {
                return <Tag color="green">Chưa cập nhật</Tag>;
            }
        },
        {
            title: "Hành động",
            key: "action",
            align: "center",
            render: (_: any, record: DataUpdateGenres) => (
                <div className="flex items-center justify-center gap-x-1">
                    <button
                        className="flex items-center gap-x-1 rounded p-1 text-admin_primary"
                        onClick={() => {
                            setGenre(record);
                            setModalCreateOrUpdateGenre(true);
                        }}
                    >
                        <Tooltip title="Sửa">
                            <BrushSquare size={18} />
                        </Tooltip>
                    </button>
                    <button
                        className="flex items-center gap-x-1 rounded p-1 text-red-500"
                        onClick={() => {
                            setIdDelete(record.id);
                            setModalDeleteGenre(true);
                        }}
                    >
                        <Tooltip title="Xóa">
                            <CloseSquare size={18} />
                        </Tooltip>
                    </button>
                </div>
            ),
            width: 100
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
                dataSource={genres ?? []}
                columns={columns}
                loading={{
                    spinning: !genres,
                    indicator: <Loading loading={!genres} />
                }}
                pagination={{
                    position: ["bottomCenter"]
                }}
                bordered
                scroll={{ x: "max-content" }}
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

            {/* Modal xóa thể loại */}
            <ModalMotion
                textHeader="Xác nhận xóa thể loại"
                onClose={() => {
                    setModalDeleteGenre(false);
                }}
                onOk={handleDeleteGenre}
                isOpen={ModalDeleteGenre}
                textOk="Xóa"
                loading={isPeddingDeleteGenre}
                modalContainerClassName="!gap-y-4"
                okButtonClassName="!bg-red-500 !text-white"
            >
                {`Bạn có chắc chắn muốn xóa thể loại này không?`}
            </ModalMotion>
        </Fragment>
    );
}
