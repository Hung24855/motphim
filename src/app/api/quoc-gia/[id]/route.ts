import { pool } from "@/database/connect";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const requiredFields = ["name", "slug"].filter((field) => !body[field]);

        if (requiredFields.length > 0) {
            return NextResponse.json({
                status: "error",
                message: `Vui lòng điền đầy đủ các trường: [${requiredFields.join(", ")}]`,
                data: []
            });
        }

        const res = await pool.query("UPDATE countries SET name = $1, slug = $2 WHERE id = $3 RETURNING *", [
            body.name,
            body.slug,
            params.id
        ]);

        return NextResponse.json({ status: "success", message: "Cập nhật quốc gia thành công", data: res.rows });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const res = await pool.query("DELETE FROM countries WHERE id = $1 RETURNING *", [params.id]);

        return NextResponse.json({ status: "success", message: "Xóa quốc gia thành công", data: res.rows });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
