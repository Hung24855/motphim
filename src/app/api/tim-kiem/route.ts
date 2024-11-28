import { NextRequest } from "next/server";
import CheckAdmin from "../middleware";
import { RouterHandler } from "../router.handler";
export const revalidate = 60;
export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool) {
            const searchParams = request.nextUrl.searchParams;
            const movie_type_id = searchParams.get("movie_type_id");
            let query = searchParams.get("q")?.replaceAll("-", " ");

            // let query = removeMark(searchParams.get("q") ?? "").split("-");
            //ILIKE là bỏ qua chữ hoa chữ thường
            // Yêu cầu phải giống ít nhất 2 từ trong mảng query
            const is_admin = await CheckAdmin(request); //Nếu admin tìm kiếm thì tìm cả nhưng phim đang ẩn

            // let sql =
            //     `SELECT movies.id, movies.movie_name, movies.slug, movies.year, movies.movie_type_id, movies.image,
            //     movies.time_per_episode, movies.episode_current, movies.episode_total, movies.lang,movies.is_visible
            //     FROM movies
            //     WHERE ${is_admin ? "" : "is_visible = true AND "}  (` +
            //     [...query]
            //         .map(
            //             (str, index) =>
            //                 `(slug ILIKE ${[0, query.length - 1].includes(index) ? `'%${str}%'` : `'%-${str}-%'`})::int`
            //         )
            //         .join(" + ") +
            //     ") >= 2" +
            //     `${movie_type_id ? "AND movie_type_id = " + `'${movie_type_id}'` : ""}`;

            //Full text search - 14/12/2024 - 14h44
            let sql = `SELECT movies.id, movies.movie_name, movies.slug, movies.year, movies.movie_type_id, movies.image,
                 movies.time_per_episode, movies.episode_current, movies.episode_total, movies.lang,movies.is_visible
                 FROM movies 
                 WHERE ${is_admin ? "" : "is_visible = true AND"} 
                 ${movie_type_id ? `movie_type_id = '${movie_type_id}' AND` : ""}
                 to_tsvector(movie_name) @@ plainto_tsquery('${query}') `;


            const movies = await pool.query(sql);
            return {
                message: "Tìm kiếm phim thành công!",
                data: movies.rows
            };
        }
    });
}
