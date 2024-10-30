"use client";
import { Permissions } from "@/actions/permissions";
import Loading from "@/base/libs/loading";
import { convertTime } from "@/base/utils/function";
import { TResGetAllAccounts } from "@/domain/tai-khoan/model";
import { AccountsService } from "@/domain/tai-khoan/services";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Select, Table, Tag } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AccountAdminView() {
    const queryClient = useQueryClient();
    const { data: users } = AccountsService.useAccounts();
    const [role, setRole] = useState<"admin" | "user">();
    const [user_id, setuser_id] = useState<string>();
    const [loading, setloading] = useState<boolean>(false);

    const handleOnChangeSelect = (value: "admin" | "user") => {
        setRole(value);
    };
    const handleChangePermission = async () => {
        if (!role || !user_id) return;
        setloading(true);
        try {
            const response = await Permissions({
                role: role,
                user_id: user_id
            });
            if (response.status === "success") {
                toast.success("Cập nhật quyền thành công!");
                queryClient.setQueryData([QUERY_KEY.GET_ACCOUNTS], (prev: TResGetAllAccounts) => {
                    return [
                        ...prev.map((user) => {
                            return user.id === user_id ? { ...user, role } : user;
                        })
                    ];
                });
                setRole(undefined);
                setuser_id(undefined);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
        setloading(false);
    };
    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Address",
            key: "address",

            render: () => {
                return <Tag color="geekblue">Chưa cập nhật</Tag>;
            }
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string) => {
                return role === "admin" ? <Tag color="gold">Quản trị</Tag> : <Tag color="default">Người dùng</Tag>;
            }
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (time: string) => {
                return convertTime(time);
            }
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (time: string) => {
                return convertTime(time);
            }
        },
        {
            title: "Acrtion",
            key: "action",
            render: (_: any, record: any) => (
                <div className="flex items-center gap-x-1">
                    <button
                        className="flex items-center gap-x-1 rounded p-1 hover:text-admin_primary"
                        onClick={() => {
                            setuser_id(record.id);
                        }}
                    >
                        {/* <Button type="primary">Khóa</Button> */}

                        <Button
                            type="primary"
                            loading={loading && user_id === record.id}
                            disabled={!role || user_id !== record.id}
                            onClick={handleChangePermission}
                        >
                            Sửa quyền
                        </Button>
                        <Select
                            style={{ width: 120 }}
                            allowClear
                            options={[
                                { value: "admin", label: "Quản trị" },
                                { value: "user", label: "Người dùng" }
                            ]}
                            placeholder="Chọn quyền"
                            onChange={handleOnChangeSelect}
                        />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            <Table
                dataSource={users}
                columns={columns}
                loading={{
                    spinning: !users,
                    indicator: <Loading loading={true} containerClassName="pt-20" />
                }}
                pagination={{
                    position: ["bottomCenter"]
                }}
                bordered
            />
        </div>
    );
}
