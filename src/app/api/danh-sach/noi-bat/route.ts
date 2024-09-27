import { pool } from "@/database/connect";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const movies = await pool.query(
            "SELECT movies.id, movies.movie_name, movies.slug,movies.content , movies.image" +
                " FROM movies" +
                " WHERE is_visible = true ORDER BY views DESC LIMIT 5"
        );
        return NextResponse.json({
            status: "success",
            message: "Lấy thông tin danh sách phim nổi bật thành công!",
            data: movies.rows
        });
    } catch (error) {
        console.log("Error: GET danh sách nổi bật", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
