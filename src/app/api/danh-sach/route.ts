import { pool } from "@/database/connect";
import { NextResponse, NextRequest } from "next/server";
import { Filter } from "../utils/filter";

export async function GET(request: NextRequest) {
    const { limitSql, offset, orderBy, where, page, limit } = Filter(request);

    const sql = `SELECT 
    movies.movie_name, movies.slug, movies.year , movies.movie_type_id,
    movies.image, movies.time_per_episode, movies.episode_current,movies.episode_total,
    movies.lang FROM movies ${where} ${orderBy} ${limitSql} ${offset}`;

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
                currentPage: page,
                pageSize: limit,
                totalPages: Math.ceil(totalRows.rows[0].count / limit)
            }
        });
    } catch (error) {
        console.log("Error: ", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
