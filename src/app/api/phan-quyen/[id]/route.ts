import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";
import CheckAdmin from "../../middleware";
import { Exception } from "../../utils/Exception";
import { status } from "../../utils/status";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const is_admin = await CheckAdmin(request);
        if (!is_admin) {
            throw new Error("Bạn không đủ quyền hạn để làm điều này!");
        }

        const body = await request.json();

        if (!body.role) {
            throw new Error("Vui lòng cung cấp role cho tài khoản cần phân quyền!");
        }

        await pool.query("UPDATE users SET role = $1 WHERE id = $2 ", [body.role, params.id]);

        return NextResponse.json({ status: status.success, message: "Cập nhật quyền thành công!", data: [] });
    } catch (error: unknown) {
        return NextResponse.json(Exception(error));
    }
}
