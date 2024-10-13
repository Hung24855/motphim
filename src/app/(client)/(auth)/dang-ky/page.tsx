import RegisternPage from "@/views/client/auth/register";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Đăng ký",
    description: "..."
};
export default function Register() {
    return <RegisternPage />;
}
