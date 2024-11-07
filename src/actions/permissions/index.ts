"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const IS_DEVELOPMENT = process.env.DEVELOPMENT === "development";

export const Permissions = async ({ user_id, role }: { user_id: string; role: "admin" | "user" }) => {
    try {
        const cookie = cookies();
<<<<<<< HEAD

        const session_product = cookie.get("__Secure-authjs.session-token")?.value;
        if (session_product) {
=======
        const session = cookie.get(IS_DEVELOPMENT ? "authjs.session-token" : "__Secure-authjs.session-token")?.value;
        if (!session) {
>>>>>>> 9332426707f094cad8f64c82293670aa6eb551e8
            redirect("/");
        }

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_API + `/phan-quyen/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
<<<<<<< HEAD
                cookie: "__Secure-authjs.session-token=" + session_product
=======
                cookie: (IS_DEVELOPMENT ? "authjs.session-token=" : "__Secure-authjs.session-token=") + session
>>>>>>> 9332426707f094cad8f64c82293670aa6eb551e8
            },
            body: JSON.stringify({ role })
        }).then((res) => res.json());
        return response;
    } catch (error) {
        throw new Error("Có lỗi xảy ra thử lại sau!");
    }
};
