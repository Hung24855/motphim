"use client";
import { CountriesService } from "@/domain/quoc-gia/service";
import { Table } from "antd";
import { ChangeEvent, Fragment, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "@/infrastructure/styles/table.ant.css";
import { IDataCreateCountry, IDataUpdateCountry } from "@/domain/quoc-gia/model";
import Input from "@/base/libs/input/page";
import { toast } from "react-toastify";
import Loading from "@/base/libs/loading";
import { ModalMotion } from "@/base/libs/modal";

const initCountry: IDataCreateCountry | IDataUpdateCountry = { name: "", slug: "" };

export default function CountriesAdminView() {
    const {
        data: countries,
        createCountryMutation,
        updateCountryMutation,
        isPeddingCreateCountry,
        isPeddingUpdateCountry,
        refetch: refetchCountries
    } = CountriesService.useCountries();

    const [ModalCreateOrUpdateCountry, setModalCreateOrUpdateCountry] = useState<boolean>(false);
    const [country, setCountry] = useState<IDataCreateCountry | IDataUpdateCountry>(initCountry);
    const [message, setMessage] = useState<string>("");

    const isTypeUpdateCountry = useMemo(() => "id" in country && country.id !== undefined, [country]);

    const handleCreateCountry = () => {
        if (country && country.name && country.slug) {
            createCountryMutation({
                data: country,
                onError: () => {
                    toast.error("Có lỗi xảy ra!");
                },
                onSuccess: () => {
                    toast.success("Thêm quốc gia thành công!");
                    setCountry(initCountry);
                    setModalCreateOrUpdateCountry(false);
                    refetchCountries();
                }
            });
        } else {
            setMessage("Vui lòng điền đầy đủ thông tin!");
        }
    };

    const handleUpdateCountry = () => {
        if (isTypeUpdateCountry && country && country.name && country.slug) {
            const _country = { ...country } as IDataUpdateCountry;
            updateCountryMutation(
                { country_id: _country.id, data: _country },
                {
                    onSuccess: () => {
                        toast.success("Cập nhật quốc gia thành công!");
                        setCountry(initCountry);
                        setModalCreateOrUpdateCountry(false);
                    },
                    onError: () => {
                        toast.error("Có lỗi xảy ra!");
                    }
                }
            );
        } else {
            setMessage("Vui là điền đầy đủ thông tin!");
        }
    };

    const columns = [
        {
            title: "Tên quốc gia",
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
            render: (_: any, record: IDataUpdateCountry) => (
                <div className="flex items-center gap-x-1">
                    <button
                        className="flex items-center gap-x-1 rounded p-1 hover:text-admin_primary"
                        onClick={() => {
                            setCountry(record);
                            setModalCreateOrUpdateCountry(true);
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
            <h1 className="text-center text-3xl font-semibold">Quản lý quốc gia</h1>
            <button
                className="mb-2 mt-3 rounded bg-admin_primary px-3 py-2 text-white"
                onClick={() => setModalCreateOrUpdateCountry(true)}
            >
                Thêm quốc gia
            </button>
            <Table
                dataSource={countries?.data}
                columns={columns}
                loading={{
                    spinning: !countries?.data,
                    indicator: <Loading loading={!countries?.data} containerClassName="pt-20" />
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
        </Fragment>
    );
}
