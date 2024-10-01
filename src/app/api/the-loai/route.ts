import { pool } from "@/database/connect";
import { NextResponse } from "next/server";
import { responseError, responseRequired } from "../utils/response";
import { status } from "../utils/status";

export async function GET(request: Request) {
    try {
        const res = await pool.query("SELECT * FROM genres");
        return NextResponse.json({
            status: status.success,
            message: "Lấy thông tin thể loại thành công",
            data: res.rows
        });
    } catch (error) {
        console.log("Error: GET the-loai", error);
        return NextResponse.json(responseError);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const requiredFields = ["name", "slug"].filter((field) => !body[field]);

        if (requiredFields.length > 0) {
            return NextResponse.json(responseRequired);
        }
        const res = await pool.query("INSERT INTO genres (name,slug) VALUES ($1,$2) RETURNING *", [
            body.name,
            body.slug
        ]);
        return NextResponse.json({ status: status.success, message: "Thêm thể loại thành công!", data: res.rows });
    } catch (error) {
        console.log("Error: POST the-loai", error);
        return NextResponse.json(responseError);
    }
}
