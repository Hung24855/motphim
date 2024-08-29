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
