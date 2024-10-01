import { pool } from "@/database/connect";
import { NextResponse, NextRequest } from "next/server";
import { Exception } from "../../utils/Exception";
export const revalidate = 3600;
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
        return NextResponse.json(Exception(error));
    }
}
