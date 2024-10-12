import { removeMark } from "@/base/utils/function";
import { type NextRequest } from "next/server";
import { RouterHandler } from "../router.handler";

export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool) {
            const searchParams = request.nextUrl.searchParams;
            const movie_type_id = searchParams.get("movie_type_id");
            let query = removeMark(searchParams.get("q") ?? "").split("-");

            //ILIKE là bỏ qua chữ hoa chữ thường
            // Yêu cầu phải giống ít nhất 2 từ trong mảng query
            let sql =
                "SELECT movies.movie_name, movies.slug, movies.year, movies.movie_type_id, movies.image, " +
                "movies.time_per_episode, movies.episode_current, movies.episode_total, movies.lang " +
                "FROM movies " +
                "WHERE is_visible = true AND (" +
                [...query]
                    .map(
                        (str, index) =>
                            `(slug ILIKE ${[0, query.length - 1].includes(index) ? `'%${str}%'` : `'%-${str}-%'`})::int`
                    )
                    .join(" + ") +
                ") >= 2 " +
                `${movie_type_id ? "AND movie_type_id = " + `'${movie_type_id}'` : ""}`;

            const res = await pool.query(sql);
            return {
                message: "Tìm kiếm phim thành công!",
                data: res.rows
            };
        },
    });
}
