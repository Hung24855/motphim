import { type NextRequest } from "next/server";
import { RouterHandler } from "../router.handler";
export const revalidate = 0;
export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool) {
            const toltal_movies = "SELECT count(*) FROM movies";
            const total_episodes = "SELECT count(*) FROM episodes";
            const total_users = "SELECT count(*) FROM users";
            const total_movies_create_this_month =
                "SELECT count(*) FROM movies WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', now())";
            const rankView = "SELECT movie_name,views FROM movies ORDER BY views DESC  LIMIT 20";
            //Phim mới cập nhật
            const new_update_movie = "SELECT movie_name,updated_at FROM movies ORDER BY updated_at DESC LIMIT 20";
            const res = await Promise.all([
                pool.query(toltal_movies),
                pool.query(total_episodes),
                pool.query(total_users),
                pool.query(total_movies_create_this_month),
                pool.query(rankView),
                pool.query(new_update_movie)
            ]);
            return {
                message: "Thông tin thống kê!",
                data: {
                    total_movies: res[0].rows[0].count,
                    total_episodes: res[1].rows[0].count,
                    total_users: res[2].rows[0].count,
                    total_movies_create_this_month: res[3].rows[0].count,
                    rankView: res[4].rows,
                    new_update_movie: res[5].rows
                }
            };
        },
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}
