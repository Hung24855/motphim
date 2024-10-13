import LoginPage from "@/views/client/auth/login";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "..."
};
export default function Login() {
    return <LoginPage />;
}
