import ForgotPasswordView from "@/views/client/forgot-password";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Quên mật khẩu",
    description: "..."
};
export default function ForgotPassword() {
    return <ForgotPasswordView />;
}
