import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";
import { status } from "../utils/status";
import { Exception } from "../utils/Exception";
import { getUserIdByTokenNextAuth } from "../middleware";
import { UpdateUserBody } from "../utils/Type";

export async function PUT(request: NextRequest) {
    try {
        const user_id = await getUserIdByTokenNextAuth(request);
        if (!user_id) {
            throw new Error("Lỗi xác thực vui lòng thực hiện lại");
        }
        const body: UpdateUserBody = await request.json();
        if (!body.username) {
            throw new Error("Vui, lòng nhập họ tên!");
        }
        const res = await pool.query("UPDATE users SET username = $1, avatar = $2  WHERE id = $3 RETURNING *", [
            body.username,
            body.avatar,
            user_id
        ]);

        //Bỏ mật khẩu khỏi response
        const { password, ...user } = res.rows[0];

        return NextResponse.json({
            status: status.success,
            message: "Cập nhật thông tin thành công!",
            data: [{ ...user }]
        });
    } catch (error: unknown) {
        return NextResponse.json(Exception(error));
    }
}
