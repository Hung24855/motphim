"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Permissions = async ({ user_id, role }: { user_id: string; role: "admin" | "user" }) => {
    try {
        const cookie = cookies();

        const session = cookie.get("authjs.session-token")?.value;
        const session_product = cookie.get("__Secure-authjs.session-token")?.value;
        if (!session || session_product) {
            redirect("/");
        }

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_API + `/phan-quyen/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                cookie: session ? "authjs.session-token=" + session : "__Secure-authjs.session-token=" + session_product
            },
            body: JSON.stringify({ role })
        }).then((res) => res.json());
        return response;
    } catch (error) {
        throw new Error("Có lỗi xảy ra thử lại sau!");
    }
};
