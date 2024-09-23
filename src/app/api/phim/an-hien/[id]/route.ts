import { pool } from "@/database/connect";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body: { is_visible: boolean } = await request.json();

        if (!body.is_visible === undefined) {
            return NextResponse.json({
                status: "error",
                message: `Vui lòng điền trường is_visible`,
                data: []
            });
        }

        await pool.query("UPDATE movies SET is_visible = $1 WHERE id = $2 RETURNING *", [body.is_visible, params.id]);

        return NextResponse.json({ status: "success", message: "Cập nhật ẩn hiện phim thành công", data: [] });
    } catch (error) {
        console.log("Error: PUT cập nhật is_visible phim", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
