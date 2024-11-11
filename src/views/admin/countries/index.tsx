"use client";
import { CountriesService } from "@/domain/quoc-gia/service";
import { Table, Tag } from "antd";
import { ChangeEvent, Fragment, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "@/infrastructure/styles/table.ant.css";
import { DataCreateCountry, DataUpdateCountry, TResGetAllCountries } from "@/domain/quoc-gia/model";
import Input from "@/base/libs/input";
import { toast } from "react-toastify";
import Loading from "@/base/libs/loading";
import { ModalMotion } from "@/base/libs/modal";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { IoTrashBinSharp } from "react-icons/io5";

const initCountry: DataCreateCountry | DataUpdateCountry = { name: "", slug: "" };

export default function CountriesAdminView() {
    const queryClient = useQueryClient();
    const {
        data: countries,
        createCountryMutation,
        updateCountryMutation,
        deleteCountryMutation,
        isPeddingCreateCountry,
        isPeddingUpdateCountry,
        isPeddingDeleteCountry
    } = CountriesService.useCountries();

    const [ModalCreateOrUpdateCountry, setModalCreateOrUpdateCountry] = useState<boolean>(false);
    const [ModalDeleteCountry, setModalDeleteCountry] = useState<boolean>(false);
    const [country, setCountry] = useState<DataCreateCountry | DataUpdateCountry>(initCountry);
    const [message, setMessage] = useState<string>("");
    const [idDelete, setIdDelete] = useState<number | undefined>();

    const isTypeUpdateCountry = useMemo(() => "id" in country && country.id !== undefined, [country]);

    const handleCreateCountry = () => {
        if (country && country.name && country.slug) {
            createCountryMutation({
                data: country,
                onError: () => {},
                onSuccess: (data) => {
                    console.log("data", data);

                    toast.success("Thêm quốc gia thành công!");
                    setCountry(initCountry);
                    setModalCreateOrUpdateCountry(false);

                    const previousData = queryClient.getQueryData<TResGetAllCountries>([QUERY_KEY.GET_ALL_COUNTRIES]);
                    if (previousData) {
                        queryClient.setQueryData<TResGetAllCountries>(
                            [QUERY_KEY.GET_ALL_COUNTRIES],
                            [data[0], ...previousData]
                        );
                    }
                }
            });
        } else {
            setMessage("Vui lòng điền đầy đủ thông tin!");
        }
    };

    const handleUpdateCountry = () => {
        if (isTypeUpdateCountry && country && country.name && country.slug) {
            const _country = { ...country } as DataUpdateCountry;
            updateCountryMutation(
                { country_id: _country.id, data: _country },
                {
                    onSuccess: () => {
                        toast.success("Cập nhật quốc gia thành công!");
                        setCountry(initCountry);
                        setModalCreateOrUpdateCountry(false);
                    },
                    onError: () => {}
                }
            );
        } else {
            setMessage("Vui là điền đầy đủ thông tin!");
        }
    };

    const handleDeleteCountry = () => {
        if (idDelete) {
            deleteCountryMutation(idDelete, {
                onSuccess: () => {
                    toast.success("Xóa quốc gia thành công!");
                    setModalDeleteCountry(false);
                }
            });
        }
    };

    const columns = [
        {
            title: "Tên quốc gia",
            dataIndex: "name",
            key: "genre_name"
        },
        {
            title: "Đường dẫn tĩnh",
            dataIndex: "slug",
            key: "slug"
        },
        {
            title: "Số phim thuộc quốc gia",
            key: "movie_count",
            render: () => {
                return <Tag color="geekblue">Chưa cập nhật</Tag>;
            }
        },
        {
            title: "SEO Title",
            key: "movie_count",
            render: () => {
                return <Tag color="green">Chưa cập nhật</Tag>;
            }
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: DataUpdateCountry) => (
                <div className="flex items-center justify-center gap-x-1">
                    <button
                        className="flex items-center gap-x-1 rounded p-1 text-admin_primary"
                        onClick={() => {
                            setCountry(record);
                            setModalCreateOrUpdateCountry(true);
                        }}
                    >
                        <FaRegEdit size={15} /> Sửa
                    </button>
                    <button
                        className="flex items-center gap-x-1 rounded p-1 text-red-500"
                        onClick={() => {
                            setIdDelete(record.id);
                            setModalDeleteCountry(true);
                        }}
                    >
                        <IoTrashBinSharp size={15} /> Xóa
                    </button>
                </div>
            )
        }
    ];
    return (
        <Fragment>
            <h1 className="text-center text-3xl font-semibold">Quản lý quốc gia</h1>
            <button
                className="mb-2 mt-3 rounded bg-admin_primary px-3 py-2 text-white"
                onClick={() => setModalCreateOrUpdateCountry(true)}
            >
                Thêm quốc gia
            </button>
            <Table
                dataSource={countries}
                columns={columns}
                loading={{
                    spinning: !countries,
                    indicator: <Loading loading={!countries} containerClassName="pt-20" />
                }}
                pagination={{
                    position: ["bottomCenter"]
                }}
                bordered
            />

            {/* Modal thêm quốc gia */}
            <ModalMotion
                textHeader={isTypeUpdateCountry ? "Cập nhật quốc gia" : "Thêm quốcgia"}
                onClose={() => {
                    setModalCreateOrUpdateCountry(false);
                    setMessage("");
                    setCountry(initCountry);
                }}
                onOk={() => {
                    if (isTypeUpdateCountry) {
                        handleUpdateCountry();
                    } else {
                        handleCreateCountry();
                    }
                }}
                isOpen={ModalCreateOrUpdateCountry}
                textOk={isTypeUpdateCountry ? "Cập nhật" : "Thêm"}
                loading={isPeddingCreateCountry || isPeddingUpdateCountry}
                okButtonClassName="!bg-admin_primary"
                modalContainerClassName="!top-20 w-[500px]"
                headerModalClassName="text-center text-xl"
            >
                <Input
                    label="Tên quốc gia"
                    placeholder="VD: Việt Nam"
                    value={country?.name}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCountry({ ...country, name: e.target.value })}
                />
                <Input
                    label="Đường dẫn tĩnh"
                    placeholder="VD: viet-nam"
                    value={country?.slug}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCountry({ ...country, slug: e.target.value })}
                />
                <div className="text-red-500">{message}</div>
            </ModalMotion>

            {/* Modal xóa quốc gia */}
            <ModalMotion
                textHeader="Xác nhận xóa quốc gia"
                onClose={() => {
                    setModalDeleteCountry(false);
                }}
                onOk={handleDeleteCountry}
                isOpen={ModalDeleteCountry}
                textOk="Xóa"
                loading={isPeddingDeleteCountry}
                modalContainerClassName="!gap-y-4"
                okButtonClassName="!bg-red-500 !text-white"
            >
                {`Bạn có chắc chắn muốn xóa quốc gia này không?`}
            </ModalMotion>
        </Fragment>
    );
}
