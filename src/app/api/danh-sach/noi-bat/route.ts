import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";
export const revalidate = 60;
export async function GET(_: NextRequest) {
    return RouterHandler({
        async mainFc(pool) {
            const movies = await pool.query(
                `SELECT movies.id, movies.movie_name, movies.slug,movies.content , movies.image 
                 FROM movies 
                 WHERE is_visible = true 
                 ORDER BY views DESC LIMIT 5`
            );
            return {
                message: "Lấy thông tin danh sách phim nổi bật thành công!",
                data: movies.rows
            };
        }
    });
}
