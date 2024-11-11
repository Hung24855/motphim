import { NextRequest } from "next/server";
import { Filter } from "../utils/filter";
import { RouterHandler } from "../router.handler";
export const revalidate = 0;
export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool) {
            const { limitSql, offset, where, page, limit } = Filter(request);
            const [movies, totalRows] = await Promise.all([
                pool.query(
                    `SELECT movies.id, movies.movie_name, movies.slug, movies.year , movies.movie_type_id, movies.image, movies.time_per_episode, movies.episode_current,movies.episode_total, movies.lang, movies.is_visible 
                     FROM movies 
                     ${where ? `WHERE ${where}` : ""} 
                     ORDER BY created_at DESC 
                     ${limitSql} ${offset}`
                ),
                pool.query(`SELECT COUNT(*) FROM movies ${where}`)
            ]);

            return {
                message: "Lấy thông tin danh sách phim thành công!",
                data: movies.rows,
                pagination: {
                    totalRows: Number(totalRows.rows[0].count),
                    currentPage: page,
                    pageSize: limit,
                    totalPages: Math.ceil(totalRows.rows[0].count / limit)
                }
            };
        },
        options:{
            request:request,
            checkAuth:"isAdmin"
        }
    });
}
