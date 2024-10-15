import { status } from "@/app/api/utils/status";
import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";
import { Exception } from "./utils/Exception";
import { Pool } from "pg";
import CheckAdmin, { getUserIdByTokenNextAuth } from "./middleware";

type response = {
    message: string;
    data: any;
    pagination?: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
};
export const RouterHandler = async ({
    mainFc,
    options
}: {
    mainFc: (pool: Pool, user_id: string, body: any) => Promise<response>;
    options?: {
        checkAuth?: "isAdmin" | "isUser";
        requiredFields?: string[];
        request: NextRequest;
    };
}) => {
    try {
        let user_id = "";
        let body: { [key: string]: any } = {};

        //Check các trường yêu cầu
        if (options?.requiredFields) {
            const { requiredFields } = options;
            body = await options.request.json();
            const isEmpty = requiredFields.filter((field) => !body[field]);
            if (isEmpty.length > 0) {
                throw new Error(`Vui lòng điền thông tin: ${isEmpty.toString()}`);
            }
        }

        //Check quyền amdin
        if (options?.checkAuth === "isAdmin") {
            const is_admin = await CheckAdmin(options.request);
            if (!is_admin) {
                throw new Error("Bạn không đủ quyền hạn để làm điều này!");
            }
        }

        //Check đăng nhập
        if (options?.checkAuth === "isUser") {
            user_id = (await getUserIdByTokenNextAuth(options.request)) ?? "";

            if (!user_id) {
                throw new Error("Lỗi xác thực vui lòng thử lại!");
            }
        }

        const response = await mainFc(pool, user_id, body);
        return NextResponse.json({
            status: status.success,
            ...response
        });
    } catch (error: unknown) {
        return NextResponse.json(Exception(error));
    }
};
