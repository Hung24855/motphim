import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";
import { status } from "../../utils/status";
import { Exception } from "../../utils/Exception";
import CheckAdmin from "../../middleware";
export async function GET(request: NextRequest) {
    try {
        const is_admin = await CheckAdmin(request);
        if (!is_admin) {
            throw new Error("Bạn không đủ quyền hạn để làm điều này!");
        }

        const res = await pool.query("SELECT users.id, users.email,users.username,users.role,users.created_at,users.updated_at FROM users WHERE email != 'admin@gmail.com'");
        return NextResponse.json({
            status: status.success,
            message: "Lấy danh sách tài khoản thành công!",
            data: res.rows
        });
    } catch (error) {
        return NextResponse.json(Exception(error));
    }
}
