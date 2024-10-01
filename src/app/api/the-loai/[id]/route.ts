import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";
import { Filter } from "../../utils/filter";
import { status } from "../../utils/status";
import { Exception } from "../../utils/Exception";
import CheckAdmin from "../../middleware";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const is_admin = await CheckAdmin(request);
        if (!is_admin) {
            throw new Error("Bạn không đủ quyền hạn để làm điều này!");
        }
        const body = await request.json();
        const requiredFields = ["name", "slug"].filter((field) => !body[field]);

        if (requiredFields.length > 0) {
           throw new Error("Vui lòng điền đầu đủ thông tin")
        }

        const res = await pool.query("UPDATE genres SET name = $1, slug = $2 WHERE id = $3 RETURNING *", [
            body.name,
            body.slug,
            params.id
        ]);

        return NextResponse.json({ status: status.success, message: "Cập nhật thể loại thành công", data: res.rows });
    } catch (error: unknown) {
        return NextResponse.json(Exception(error));
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const is_admin = await CheckAdmin(request);
        if (!is_admin) {
            throw new Error("Bạn không đủ quyền hạn để làm điều này!");
        }
        const res = await pool.query("DELETE FROM genres WHERE id = $1 RETURNING *", [params.id]);
        return NextResponse.json({ status: status.success, message: "Xóa thể loại thành công", data: res.rows });
    } catch (error: unknown) {
        return NextResponse.json(Exception(error));
    }
}
// Danh sách phim theo thể loại
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    let select =
        "movies.id,movies.movie_name, movies.slug, movies.year, movies.image, movies.time_per_episode, movies.episode_current, movies.episode_total,movies.lang,genres.name as genre_name";

    let join =
        "INNER JOIN movie_genre ON movies.id = movie_genre.movie_id INNER JOIN genres ON movie_genre.genres_id = genres.id";
    try {
        const { limitSql, offset, orderBy, where, page, limit } = Filter(request);
        const [movies, totalRows] = await Promise.all([
            pool.query(
                `SELECT ${select} FROM movies ${join} WHERE is_visible = true AND ${where} genres.slug = $1 ${orderBy} ${limitSql} ${offset}`,
                [params.id]
            ),
            pool.query(
                `SELECT COUNT(*) FROM movies ${join} WHERE is_visible = true AND ${where} genres.slug = $1 ${orderBy} `,
                [params.id]
            )
        ]);
        if (movies.rows.length === 0) {
            return NextResponse.json({
                status: status.success,
                message: "Không có phim thuộc thể loại này!",
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
            message: "Lấy phim theo thể loại thành công!",
            data: movies.rows,
            pagination: {
                totalRows: Number(totalRows.rows[0].count),
                currentPage: Number(page),
                pageSize: Number(limit),
                totalPages: Math.ceil(totalRows.rows[0].count / Number(limit))
            }
        });
    } catch (error:unknown) {
        return NextResponse.json(Exception(error));
    }
}
