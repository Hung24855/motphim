import { pool } from "@/database/connect";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const { country, year, limit = "20", slug, sort_field, page = "1" } = Object.fromEntries(searchParams);

    const query: string[] = [];
    if (slug) query.push(`slug = '${slug}'`);
    if (country) query.push(`country = '${country}'`);
    if (year) query.push(`year = '${year}'`);

    const where = query.length ? `WHERE ${query.join(" AND ")}` : "";
    const orderBy = sort_field ? `ORDER BY ${sort_field}` : "";
    const limitSql = `LIMIT ${Number(limit)}`;
    const offset = page ? `OFFSET ${Number(limit) * (Number(page) - 1)}` : "";

    const sql = `SELECT 
    movies.movie_name, movies.slug, movies.year , 
    movies.image, movies.time_per_episode, movies.episode_current,
    movies.lang FROM movies ${where} ${orderBy} ${limitSql} ${offset}`;

    // console.log("sql",sql);

    try {
        const [movies, totalRows] = await Promise.all([
            pool.query(sql),
            pool.query(`SELECT COUNT(*) FROM movies ${where}`)
        ]);

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
