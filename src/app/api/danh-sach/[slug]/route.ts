import { pool } from "@/database/connect";
import { NextResponse, NextRequest } from "next/server";
import { Filter } from "../../utils/filter";
import { status } from "../../utils/status";
import { Exception } from "../../utils/Exception";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const { limitSql, offset, orderBy, where, page, limit } = Filter(request);

    let sql = `SELECT 
    movies.movie_name, movies.slug, movies.year , 
    movies.image, movies.time_per_episode, movies.episode_current,movies.episode_total, movies.lang FROM movies `;
    //Join bảng
    let join = "INNER JOIN movie_type ON movie_type.id = movies.movie_type_id";

    try {
        const [movies, totalRows] = await Promise.all([
            pool.query(`${sql} ${join} WHERE movie_type.slug = $1  ${orderBy} ${limitSql} ${offset}`, [params.slug]),
            pool.query(`SELECT COUNT(*) FROM movies ${join} WHERE ${where} movie_type.slug = $1 `, [params.slug])
        ]);

        if (movies.rows.length === 0) {
            return NextResponse.json({
                status: status.success,
                message: "Phim không tồn tại!",
                data: [],
                pagination: {
                    totalRows: Number(totalRows.rows[0].count),
                    currentPage: page,
                    pageSize: limit,
                    totalPages: Math.ceil(totalRows.rows[0].count / limit)
                }
            });
        }

        return NextResponse.json({
            status: status.success,
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
        return NextResponse.json(Exception(error));
    }
}
