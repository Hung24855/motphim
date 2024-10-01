
import { Exception } from "@/app/api/utils/Exception";
import { status } from "@/app/api/utils/status";
import { pool } from "@/database/connect";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    // id = movie_id
    try {
        const body: { user_id: boolean } = await request.json();

        if (!body.user_id) {
            throw new Error("Vui lòng đăng nhập để thực hiện chức năng này!")
        }

        await pool.query("INSERT INTO favorites (user_id, movie_id) VALUES ($1, $2)", [body.user_id, params.id]);

        return NextResponse.json({
            status: status.success,
            message: "Yêu thích phim thành công!",
            data: {
                id: params.id,
                is_favorites: true
            }
        });
    } catch (error) {
        return NextResponse.json(Exception(error));
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    // id = movie_id
    try {
        const body: { user_id: boolean } = await request.json();

        if (!body.user_id) {
            throw new Error("Vui lòng đăng nhập để thực hiện chức năng này!")
        }

        await pool.query("DELETE FROM favorites WHERE user_id = $1 AND movie_id = $2", [body.user_id, params.id]);

        return NextResponse.json({
            status: "success",
            message: "Bỏ yêu thích phim thành công!",
            data: {
                id: params.id,
                is_favorites: false
            }
        });
    } catch (error) {
        return NextResponse.json(Exception(error));
    }
}

// Get danh sách phim yêu thích theo user_id
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        let select =
            "SELECT movies.id,movies.movie_name, movies.slug, movies.year, movies.image, movies.time_per_episode, movies.episode_current, movies.episode_total,movies.lang ";

        const res = await pool.query(
            select + ` FROM favorites INNER JOIN movies ON favorites.movie_id = movies.id WHERE user_id = $1`,
            [params.id]
        );
        return NextResponse.json({
            status: status.success,
            message: "Lấy danh sách phim yêu thích thành công!",
            data: res.rows
        });
    } catch (error) {
        return NextResponse.json(Exception(error));
    }
}
