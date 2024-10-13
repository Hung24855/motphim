import AccountAdminView from "@/views/admin/account";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Quản lý tài khoản",
    description: "..."
};

export default function AccountManagement() {
    return <AccountAdminView />;
}
