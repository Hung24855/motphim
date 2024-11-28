"use server";
import { auth, signIn, signOut } from "@/auth";
import { pool } from "@/database/connect";
import { IResponseData } from "@/infrastructure/config/types/apiResponse";
import { AuthError } from "next-auth";

export const register_action = async ({
    email,
    password,
    username
}: {
    email: string;
    password: string;
    username: string;
}): Promise<IResponseData> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
    try {
        const response = await fetch(baseUrl + "/auth/dang-ky", {
            method: "POST",
            body: JSON.stringify({ email, password, username })
        }).then((res) => res.json());

        return response;
    } catch (error) {
        return {
            data: [],
            message: "Có lỗi xảy ra",
            status: "error"
        };
    }
};

export const login_action = async ({ email, password }: { email: string; password: string }) => {
    try {
        await signIn("credentials", { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        status: "error",
                        message: "Tài khoản hoặc mật khẩu không chính xác!"
                    };
                default:
                    return {
                        status: "error",
                        message: "Có lỗi xảy ra!."
                    };
            }
        }
        throw error;
    }
};

export async function logout_action() {
    const session = await auth();
    const user_id = session?.user.id;
    //Xóa token thông báo khi đăng xuất tránh trình trạng đăng nhập tài khoản khác nhưng vẫn nhận thông báo
    pool.query("UPDATE users SET token_notification = NULL WHERE id = $1", [user_id]);
    await signOut();
}
