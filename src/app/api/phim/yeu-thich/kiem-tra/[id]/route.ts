import { getUserIdByTokenNextAuth } from "@/app/api/middleware";
import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";

// Kiểm tra phim đã được yêu thích chưa
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user_id = await getUserIdByTokenNextAuth(request);
        // console.log("🚀 ~ GET ~ user_id:", user_id);
        if (!user_id) {
            return NextResponse.json({ status: "error", message: "Lỗi xác thực vui lòng đăng nhập!", data: [] });
        }

        const res = await pool.query("SELECT * FROM favorites WHERE user_id= $1 AND movie_id=$2", [user_id, params.id]);

        return NextResponse.json({
            status: "succes",
            message: res.rows.length > 0 ? "Phim đã được yêu thích" : "Phim chưa được yêu thích",
            data: [
                {
                    isFavorites: res.rows.length > 0
                }
            ]
        });
    } catch (error) {
        console.log("Error: GET kiểm tra phim yeu thich", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
