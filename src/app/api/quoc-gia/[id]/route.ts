import { NextRequest } from "next/server";
import { Filter } from "../../utils/filter";
import { RouterHandler } from "../../router.handler";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            const res = await pool.query("UPDATE countries SET name = $1, slug = $2 WHERE id = $3 RETURNING *", [
                body.name,
                body.slug,
                params.id
            ]);

            return { message: "Cập nhật quốc gia thành công", data: res.rows };
        },
        options: {
            request: request,
            checkAuth: "isAdmin",
            required: ["name", "slug"]
        }
    });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    return RouterHandler({
        async mainFc(pool) {
            const res = await pool.query("DELETE FROM countries WHERE id = $1 RETURNING *", [params.id]);
            return { message: "Xóa quốc gia thành công", data: res.rows };
        },
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}
export const revalidate = 0;
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    return RouterHandler({
        async mainFc(pool) {
            const { limitSql, offset, orderBy, where, page, limit } = Filter(request);
            const [movies, totalRows] = await Promise.all([
                pool.query(
                    `SELECT movies.id, movies.movie_name, movies.slug, movies.year , movies.image, movies.time_per_episode, movies.episode_current, movies.episode_total,movies.lang,countries.name as country_name 
                     FROM movies 
                     INNER JOIN movie_country ON movies.id = movie_country.movie_id 
                     INNER JOIN countries ON movie_country.country_id = countries.id 
                     WHERE is_visible = true AND ${where} countries.slug = $1 ${orderBy} ${limitSql} ${offset}`,
                    [params.id]
                ),
                pool.query(
                    `SELECT COUNT(*) 
                     FROM movies 
                     INNER JOIN movie_country ON movies.id = movie_country.movie_id 
                     INNER JOIN countries ON movie_country.country_id = countries.id 
                     WHERE is_visible = true AND ${where} countries.slug = $1 ${orderBy} `,
                    [params.id]
                )
            ]);

            return {
                message:
                    movies.rows.length === 0
                        ? "Không có phim thuộc thể loại không!"
                        : "Lấy phim theo quốc gia thành công!",
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
