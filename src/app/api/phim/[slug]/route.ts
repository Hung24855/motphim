import { pool } from "@/database/connect";
import { NextResponse } from "next/server";
export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        // let join = `INNER JOIN movie_genre ON movies.id = movie_genre.movie_id
        //      INNER JOIN genres ON movie_genre.genres_id = genres.id
        //      INNER JOIN movie_country ON movies.id = movie_country.movie_id
        //      INNER JOIN countries ON movie_country.country_id = countries.id
        //      `;

        let join = `INNER JOIN movie_genre ON movies.id = movie_genre.movie_id 
             INNER JOIN genres ON movie_genre.genres_id = genres.id`;

        const res = await pool.query(
            "SELECT movies.*, genres.name AS genre,genres.slug AS genre_slug  FROM movies " + join + " WHERE movies.slug = $1",
            [params.slug]
        );

        if (res.rows.length === 0) {
            return NextResponse.json({
                status: "success",
                message: "Phim không tồn tại!",
                data: []
            });
        }
        return NextResponse.json({
            status: "success",
            message: "Lấy thông tin chi tiết phim thành công!",
            data: res.rows
        });
    } catch (error) {
        console.log("Error: get_movie ", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
