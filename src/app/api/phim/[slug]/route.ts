import { NextRequest } from "next/server";
import { status } from "../../utils/status";
import { RouterHandler } from "../../router.handler";
export const revalidate = 3600;
export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
    return RouterHandler({
        async mainFc(pool) {
            let join = `INNER JOIN movie_genre ON movies.id = movie_genre.movie_id 
                        INNER JOIN genres ON movie_genre.genres_id = genres.id`;

            const res = await pool.query(
                `SELECT movies.*, genres.name AS genre,genres.slug AS genre_slug  
                 FROM movies ${join}
                 WHERE movies.slug = $1`,
                [params.slug]
            );
            if (res.rows.length === 0) {
                return {
                    message: "Phim không tồn tại!",
                    data: []
                };
            }

            const [genres, countries, episodes] = await Promise.all([
                pool.query(
                    `SELECT movie_genre.*,genres.name ,genres.slug 
                     FROM movie_genre INNER 
                     JOIN genres ON movie_genre.genres_id = genres.id 
                     WHERE movie_id = $1`,
                    [res.rows[0]?.id]
                ),
                pool.query(
                    `SELECT movie_country.*,countries.name,countries.slug FROM movie_country 
                     INNER JOIN countries ON movie_country.country_id = countries.id 
                     WHERE movie_id = $1`,
                    [res.rows[0]?.id]
                ),
                // //Chuyển tập phim sang number vì ban đầu name của nó là chuỗi nên không order_by được
                pool.query(
                    "SELECT * FROM episodes WHERE movie_id = $1 ORDER BY CAST(REGEXP_REPLACE(name, '\\D', '', 'g') AS INTEGER)",
                    [res.rows[0]?.id]
                ),
                // Tăng lượt xem
                pool.query("UPDATE movies SET views = views + 1 WHERE id = $1", [res.rows[0]?.id])
            ]);

            return {
                message: "Lấy thông tin chi tiết phim thành công!",
                data: [
                    {
                        ...res.rows[0],
                        episodes: episodes.rows,
                        genres: genres.rows,
                        countries: countries.rows
                    }
                ]
            };
        }
    });
}

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    //slug là id phim
    return RouterHandler({
        async mainFc(pool, _, body) {
            // Cập nhật phim

            let sql_update_movie = `UPDATE movies 
                                    SET movie_name = $1, slug = $2,content = $3,title_head = $4,image = $5,
                                    time_per_episode = $6, episode_current = $7,episode_total = $8,movie_type_id = $9,trailer_youtube_url = $10
                                    WHERE id=$11`;

            pool.query(
                sql_update_movie,
                [
                    body.movie_name,
                    body.slug,
                    body.content,
                    body.movie_name,
                    body.image,
                    body.time_per_episode,
                    body.episode_current,
                    body.episode_total,
                    body.movie_type_id,
                    body.trailer_youtube_url,
                    params.slug
                ],
                async (error) => {
                    if (error) {
                        throw new Error(error.message);
                    }

                    //C1: Xóa danh mục cũ và thêm danh mục mới
                    //C2: Xóa những danh mục cũ không có trong lựa chọn mới và thêm những lựa chọn mới

                    await Promise.all([
                        pool.query("DELETE FROM movie_country WHERE movie_id = $1", [params.slug]),
                        pool.query("DELETE FROM movie_genre WHERE movie_id = $1", [params.slug])
                    ]);

                    const queries = [
                        ...body.countriesId.map((country_id: any) => ({
                            query: "INSERT INTO movie_country (movie_id,country_id) VALUES ($1,$2)",
                            values: [params.slug, country_id]
                        })),
                        ...body.genresId.map((genre_id: any) => ({
                            query: "INSERT INTO movie_genre (movie_id,genres_id) VALUES ($1,$2)",
                            values: [params.slug, genre_id]
                        }))
                    ];
                    const promises = queries.map(({ query, values }) => pool.query(query, [...values]));
                    Promise.all(promises)
                        .then(() => {
                            return {
                                message: "Cập nhật phim thành công",
                                data: []
                            };
                        })
                        .catch((error) => {
                            throw new Error(error.message);
                        });
                }
            );

            return { message: "Cập nhật phim thành công!", data: [] };
        },
        options: {
            request: request,
            checkAuth: "isAdmin",
            required: [
                "countriesId",
                "genresId",
                "episode_current",
                "time_per_episode",
                "movie_name",
                "quality",
                "image",
                "episode_total",
                "year",
                "content",
                "slug"
            ]
        }
    });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    //slug là id phim
    return RouterHandler({
        async mainFc(pool) {
            await pool.query("DELETE FROM movies WHERE id = $1", [params.slug]);
            return {
                status: status.success,
                message: "Xóa phim thành công!",
                data: {
                    id: params.slug
                }
            };
        },
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}
