import { NextRequest } from "next/server";
import { Filter } from "../../utils/filter";
import { RouterHandler } from "../../router.handler";
export const revalidate = 0;
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    return RouterHandler({
        async mainFc(pool) {
            const { limitSql, offset, orderBy, where, page, limit } = Filter(request);
            const [movies, totalRows] = await Promise.all([
                pool.query(
                    `SELECT movies.movie_name, movies.slug, movies.year, movies.image, movies.time_per_episode, movies.episode_current,movies.episode_total, movies.lang 
                     FROM movies 
                     INNER JOIN movie_type ON movie_type.id = movies.movie_type_id 
                     WHERE movie_type.slug = $1  ${orderBy} ${limitSql} ${offset}`,
                    [params.slug]
                ),
                pool.query(
                    `SELECT COUNT(*) 
                     FROM movies 
                     INNER JOIN movie_type ON movie_type.id = movies.movie_type_id 
                     WHERE ${where} movie_type.slug = $1 `,
                    [params.slug]
                )
            ]);

            return {
                message:
                    movies.rows.length === 0
                        ? "Không có phim thuộc thể loại này!"
                        : "Lấy thông tin danh sách phim thành công!",
                data: movies.rows,
                pagination: {
                    totalRows: Number(totalRows.rows[0].count),
                    currentPage: Number(page),
                    pageSize: Number(limit),
                    totalPages: Math.ceil(totalRows.rows[0].count / Number(limit))
                }
            };
        }
    });
}
