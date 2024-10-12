import { RouterHandler } from "@/app/api/router.handler";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    // id = movie_id
    return RouterHandler({
        async mainFc(pool, user_id) {
            await pool.query("INSERT INTO favorites (user_id, movie_id) VALUES ($1, $2)", [user_id, params.id]);

            return {
                message: "Yêu thích phim thành công!",
                data: {
                    id: params.id,
                    is_favorites: true
                }
            };
        },
        options: {
            request: request,
            checkAuth: "isUser"
        }
    });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    // id = movie_id

    return RouterHandler({
        async mainFc(pool, user_id) {
            await pool.query("DELETE FROM favorites WHERE user_id = $1 AND movie_id = $2", [user_id, params.id]);
            return {
                message: "Bỏ yêu thích phim thành công!",
                data: {
                    id: params.id,
                    is_favorites: false
                }
            };
        },
        options: {
            request: request,
            checkAuth: "isUser"
        }
    });
}

// Get danh sách phim yêu thích theo user_id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    return RouterHandler({
        async mainFc(pool, user_id) {
            let select =
                "SELECT movies.id,movies.movie_name, movies.slug, movies.year, movies.image, movies.time_per_episode, movies.episode_current, movies.episode_total,movies.lang ";

            const res = await pool.query(
                select + ` FROM favorites INNER JOIN movies ON favorites.movie_id = movies.id WHERE user_id = $1`,
                [user_id]
            );
            return {
                message: "Lấy danh sách phim yêu thích thành công!",
                data: res.rows
            };
        },
        options: {
            request: request,
            checkAuth: "isUser"
        }
    });
}
