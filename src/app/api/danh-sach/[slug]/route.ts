import { pool } from "@/database/connect";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const searchParams = request.nextUrl.searchParams;
    const { country, year, limit = "20", sort_field, page = "1" } = Object.fromEntries(searchParams);
    const query: string[] = [];
    if (country) query.push(`country = '${country}'`);
    if (year) query.push(`year = '${year}'`);

    const where = query.length ? `${query.join(" AND ")}` : "";
    const orderBy = sort_field ? `ORDER BY ${sort_field}` : "";
    const limitSql = `LIMIT ${Number(limit)}`;
    const offset = page ? `OFFSET ${Number(limit) * (Number(page) - 1)}` : "";

    let sql = `SELECT 
    movies.movie_name, movies.slug, movies.year , 
    movies.image, movies.time_per_episode, movies.episode_current, movies.lang FROM movies `;
    //Join bảng
    let join =
        "INNER JOIN movie_genre ON movies.id = movie_genre.movie_id INNER JOIN genres ON movie_genre.genres_id = genres.id ";

    try {
        const [movies, totalRows] = await Promise.all([
            pool.query(`${sql} ${join} WHERE genres.slug = $1`, [params.slug]),
            pool.query(
                `SELECT COUNT(*) FROM movies ${join} WHERE ${where} genres.slug = $1 ${orderBy} ${limitSql} ${offset}`,
                [params.slug]
            )
        ]);

        if (movies.rows.length === 0) {
            return NextResponse.json({
                status: "success",
                message: "Phim không tồn tại!",
                data: [],
                pagination: {
                    totalRows: Number(totalRows.rows[0].count),
                    currentPage: Number(page),
                    pageSize: Number(limit),
                    totalPages: Math.ceil(totalRows.rows[0].count / Number(limit))
                }
            });
        }

        return NextResponse.json({
            status: "success",
            message: "Lấy thông tin danh sách phim thành công!",
            data: movies.rows,
            pagination: {
                totalRows: Number(totalRows.rows[0].count),
                currentPage: Number(page),
                pageSize: Number(limit),
                totalPages: Math.ceil(totalRows.rows[0].count / Number(limit))
            }
        });
    } catch (error) {
        console.log("Error: ", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
