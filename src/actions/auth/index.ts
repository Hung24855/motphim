"use server";

import { signOut, signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import { IResponseData } from "@/infrastructure/config/types/apiResponse";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const register_action = async ({
    email,
    password,
    username
}: {
    email: string;
    password: string;
    username: string;
}): Promise<IResponseData> => {
    // console.log("email, password: ", email, password);
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
        revalidatePath("/");
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Tài khoản hoặc mật khẩu không chính xác!"
                    };
                default:
                    return {
                        message: "Có lỗi xảy ra!."
                    };
            }
        }
        throw error;
    }
};

export async function logout_action() {
    await signOut({ redirect: false });
    revalidatePath("/");
    redirect("/");
}
