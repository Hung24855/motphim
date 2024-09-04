import { pool } from "@/database/connect";
import { NextResponse } from "next/server";
export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const res = await pool.query("SELECT * FROM movies WHERE slug = $1", [params.slug]);

        if (res.rows.length === 0) {
            return NextResponse.json({
                status: "success",
                message: "Phim không tồn tại!",
                data: []
            });
        }
        return NextResponse.json({
            status: "success",
            message: "Lấy thông tin chi tiết phim thành công!",
            data: res.rows
        });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
