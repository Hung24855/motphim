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
                     JOIN movie_genre ON movies.id = movie_genre.movie_id
                     JOIN genres ON movie_genre.genres_id = genres.id
                     JOIN movie_country ON movies.id = movie_country.movie_id
                     JOIN countries ON movie_country.country_id = countries.id
                     ${where ? `WHERE ${where}` : ""} 
                     GROUP BY movies.id
                     ORDER BY created_at DESC 
                     ${limitSql} ${offset}`
                ),
                pool.query(
                    `SELECT COUNT(DISTINCT movies.id)
                     FROM movies 
                     JOIN movie_genre ON movies.id = movie_genre.movie_id
                     JOIN genres ON movie_genre.genres_id = genres.id
                     JOIN movie_country ON movies.id = movie_country.movie_id
                     JOIN countries ON movie_country.country_id = countries.id
                     ${where ? `WHERE ${where}` : ""}`
                )
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
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}
