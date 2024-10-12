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

//Khi truyền isAmdin | isLogin | requiredFields Cần truyền thêm request

export const RouterHandler = async ({
    mainFc,
    options
}: {
    mainFc: (pool: Pool, user_id: string) => Promise<response>;
    options?: {
        checkAuth?: "isAdmin" | "isUser";
        checkRequired?: { requiredFields: string[]; body: any };
        request: NextRequest;
    };
}) => {
    try {
        let user_id = "";

        //Check các trường yêu cầu
        if (options?.checkRequired) {
            const { body, requiredFields } = options.checkRequired;
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

        const response = await mainFc(pool, user_id);
        return NextResponse.json({
            status: status.success,
            ...response
        });
    } catch (error: unknown) {
        return NextResponse.json(Exception(error));
    }
};
