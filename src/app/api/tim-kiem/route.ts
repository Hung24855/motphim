import { removeMark } from "@/base/utils/function";
import { pool } from "@/database/connect";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        let query = removeMark(searchParams.get("q") ?? "").split("-");

        //ILIKE là bỏ qua chữ hoa chữ thường
        let sql =
            "SELECT movies.movie_name, movies.slug, movies.year , movies.movie_type_id,movies.image, movies.time_per_episode, movies.episode_current,movies.episode_total,movies.lang FROM movies" +
            ` WHERE slug ILIKE ANY (ARRAY[${[...query].map((str) => `'%-${str}-%'`)}])`;

        console.log("sql tim-kiem phim", sql);

        const res = await pool.query(sql);
        return NextResponse.json({ status: "success", message: "Tìm kiếm phim thành công!", data: res.rows });
    } catch (error) {
        console.log("Error: GET tim-kiem", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
