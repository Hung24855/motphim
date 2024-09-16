import { pool } from "@/database/connect";
import { NextRequest, NextResponse } from "next/server";
import { Filter } from "../../utils/filter";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const requiredFields = ["name", "slug"].filter((field) => !body[field]);

        if (requiredFields.length > 0) {
            return NextResponse.json({
                status: "error",
                message: `Vui lòng điền đầy đủ các trường: [${requiredFields.join(", ")}]`,
                data: []
            });
        }

        const res = await pool.query("UPDATE countries SET name = $1, slug = $2 WHERE id = $3 RETURNING *", [
            body.name,
            body.slug,
            params.id
        ]);

        return NextResponse.json({ status: "success", message: "Cập nhật quốc gia thành công", data: res.rows });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const res = await pool.query("DELETE FROM countries WHERE id = $1 RETURNING *", [params.id]);

        return NextResponse.json({ status: "success", message: "Xóa quốc gia thành công", data: res.rows });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    let select =
        "movies.movie_name, movies.slug, movies.year , movies.image, movies.time_per_episode, movies.episode_current,movies.lang,countries.name as country_name";

    let join =
        "INNER JOIN movie_country ON movies.id = movie_country.movie_id INNER JOIN countries ON movie_country.country_id = countries.id";
    try {
        const { limitSql, offset, orderBy, where, page, limit } = Filter(request);
        const [movies, totalRows] = await Promise.all([
            pool.query(
                `SELECT ${select} FROM movies ${join} WHERE ${where} countries.slug = $1 ${orderBy} ${limitSql} ${offset}`,
                [params.id]
            ),
            pool.query(
                `SELECT COUNT(*) FROM movies ${join} WHERE ${where} countries.slug = $1 ${orderBy} ${limitSql} ${offset}`,
                [params.id]
            )
        ]);
        if (movies.rows.length === 0) {
            return NextResponse.json({
                status: "success",
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
            status: "success",
            message: "Lấy phim theo quốc gia thành công!",
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
