"use server";
import { signOut, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { IResponseData } from "@/infrastructure/config/types/apiResponse";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { status } from "@/app/api/utils/status";

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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, username })
        }).then((res) => res.json());

        return response;
    } catch (error) {
        console.log("Error: register_action", error);
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
    await signOut();
    revalidatePath("/");
}

export const Permissions = async ({ user_id, role }: { user_id: string; role: "admin" | "user" }) => {
    try {
        const cookie = cookies();
        const session = cookie.get("authjs.session-token")?.value;
        if (!session) {
            redirect("/");
        }

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_API + `/phan-quyen/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                cookie: "authjs.session-token=" + session
            },
            body: JSON.stringify({ role })
        }).then((res) => res.json());
        return response;
    } catch (error) {
        throw new Error("Có lỗi xảy ra thử lại sau!");
    }
};
