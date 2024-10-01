
import CheckAdmin from "@/app/api/middleware";
import { Exception } from "@/app/api/utils/Exception";
import { status } from "@/app/api/utils/status";
import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const is_admin = await CheckAdmin(request);
        if (!is_admin) {
            throw new Error("Bạn không đủ quyền hạn để làm điều này!");
        }

        const body: { is_visible: boolean } = await request.json();
        if (!body.is_visible === undefined) {
            throw new Error("Vui lòng điền đầy đủ thông tin");
        }

        await pool.query("UPDATE movies SET is_visible = $1 WHERE id = $2 RETURNING *", [body.is_visible, params.id]);

        return NextResponse.json({
            status: status.success,
            message: "Cập nhật ẩn hiện phim thành công",
            data: {
                id: params.id,
                is_visible: body.is_visible
            }
        });
    } catch (error) {
        return NextResponse.json(Exception(error));
    }
}
