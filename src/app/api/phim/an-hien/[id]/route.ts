import { responseError, responseRequired } from "@/app/api/utils/response";
import { status } from "@/app/api/utils/status";
import { pool } from "@/database/connect";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body: { is_visible: boolean } = await request.json();

        if (!body.is_visible === undefined) {
            return NextResponse.json(responseRequired);
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
        console.log("Error: PUT cập nhật is_visible phim", error);
        return NextResponse.json(responseError);
    }
}
