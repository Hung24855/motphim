import { getUserIdByTokenNextAuth } from "@/app/api/middleware";
import { Exception } from "@/app/api/utils/Exception";
import { status } from "@/app/api/utils/status";
import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";

// Kiểm tra phim đã được yêu thích chưa
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user_id = await getUserIdByTokenNextAuth(request);
   
        if (!user_id) {
            throw new Error("Lỗi xác thực vui lòng thử lại!")
        }

        const res = await pool.query("SELECT * FROM favorites WHERE user_id= $1 AND movie_id=$2", [user_id, params.id]);

        return NextResponse.json({
            status: status.success,
            message: res.rows.length > 0 ? "Phim đã được yêu thích" : "Phim chưa được yêu thích",
            data: {
                id: params.id,
                is_favorites: res.rows.length > 0
            }
        });
    } catch (error) {
        return NextResponse.json(Exception(error));
    }
}
