import { pool } from "@/database/connect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const res = await pool.query("SELECT * FROM genres");
        return NextResponse.json({ status: "success", message: "Lấy thông tin thể loại thành công", data: res.rows });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}

export async function POST(request: Request) {
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
        const res = await pool.query("INSERT INTO genres (name,slug) VALUES ($1,$2) RETURNING *", [body.name, body.slug]);
        return NextResponse.json({ status: "success", message: "Thêm thể loại thành công!", data: res.rows });
    } catch (error) {
        console.log("Error: ", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}

