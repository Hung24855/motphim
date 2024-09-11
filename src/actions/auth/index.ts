"use server";

import { IResponseData } from "@/infrastructure/config/types/apiResponse";

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
