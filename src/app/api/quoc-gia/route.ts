import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";
import { status } from "../utils/status";
import { Exception } from "../utils/Exception";
import CheckAdmin from "../middleware";

export async function GET(request: Request) {
    try {
        const res = await pool.query("SELECT * FROM countries");
        return NextResponse.json({
            status: status.success,
            message: "Lấy thông tin quốc gia thành công",
            data: res.rows
        });
    } catch (error:unknown) {
        return NextResponse.json(Exception(error));
    }
}

export async function POST(request: NextRequest) {
    try {

        const is_admin = await CheckAdmin(request);
        if (!is_admin) {
            throw new Error("Bạn không đủ quyền hạn để làm điều này!");
        }
        const body = await request.json();
        const requiredFields = ["name", "slug"].filter((field) => !body[field]);

        if (requiredFields.length > 0) {
            throw new Error("Vui lòng điền đầu đủ thông tin")
        }
        const res = await pool.query("INSERT INTO countries (name,slug) VALUES ($1,$2) RETURNING *", [
            body.name,
            body.slug
        ]);
        return NextResponse.json({ status: status.success, message: "Thêm quốc gia thành công", data: res.rows });
    } catch (error:unknown) {
        return NextResponse.json(Exception(error));
    }
}
