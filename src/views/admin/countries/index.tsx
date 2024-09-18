"use client";
import { CountriesService } from "@/domain/quoc-gia/service";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Table } from "antd";
import { Fragment, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "@/infrastructure/styles/table.ant.css";
import { IDataCreateCountry } from "@/domain/quoc-gia/model";
import Modal from "@/base/libs/modal";
import Input from "@/base/libs/input/page";
import { toast } from "react-toastify";

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
        title: "Hành động",
        key: "action",
        render: (_: any, record: any) => (
            <div className="flex items-center gap-x-1">
                <button className="hover:text-admin_primary flex items-center gap-x-1 rounded p-1">
                    <FaRegEdit size={15} /> Sửa
                </button>
            </div>
        )
    }
];

const initCountry: IDataCreateCountry = { name: "", slug: "" };

export default function CountriesAdminView() {
    const {
        data: countries,
        createCountryMutation,
        isPeddingCreateCountry,
        refetch: refetchCountries
    } = CountriesService.useCountries();

    const [ModalCreateCountry, setModalCreateCountry] = useState<boolean>(false);
    const [country, setCountry] = useState<IDataCreateCountry>(initCountry);
    const [message, setMessage] = useState<string>("");

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
                    setModalCreateCountry(false);
                    refetchCountries();
                }
            });
        } else {
            setMessage("Vui lòng điền đầy đủ thông tin!");
        }
    };
    return (
        <Fragment>
            <h1 className="text-3xl font-semibold">Quản lý quốc gia</h1>
            <button
                className="bg-admin_primary mb-2 mt-3 rounded px-3 py-2 text-white"
                onClick={() => setModalCreateCountry(true)}
            >
                Thêm quốc gia
            </button>
            <Table
                dataSource={countries?.data}
                columns={columns}
                loading={{
                    spinning: !countries?.data,
                    indicator: <Spin size="large" indicator={<LoadingOutlined spin />} />,
                    tip: "Đang tải dữ liệu..." // Custom message
                }}
                pagination={{
                    position: ["bottomCenter"]
                }}
            />

            {/* Modal thêm quốc gia */}
            <Modal
                textHeader="Thêm quốc gia"
                onClose={() => {
                    setModalCreateCountry(false);
                    setMessage("");
                    setCountry(initCountry);
                }}
                onOk={() => {
                    handleCreateCountry();
                }}
                isOpen={ModalCreateCountry}
                textOk="Thêm"
                loading={isPeddingCreateCountry}
                okButtonClassName="bg-admin_primary"
                modalContainerClassName="!top-20 w-[500px]"
                headerModalClassName="text-center text-xl"
            >
                <Input
                    label="Tên quốc gia"
                    placeholder="VD: Việt Nam"
                    value={country?.name}
                    onChange={(e) => setCountry({ ...country, name: e.target.value })}
                />
                <Input
                    label="Đường dẫn tĩnh"
                    placeholder="VD: viet-nam"
                    value={country?.slug}
                    onChange={(e) => setCountry({ ...country, slug: e.target.value })}
                />
                <div className="text-red-500">{message}</div>
            </Modal>
        </Fragment>
    );
}
