import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";
import { Filter } from "../../utils/filter";
export const revalidate = 0;
export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, user_id) {
            const { limitSql } = Filter(request);
            const res = await pool.query(
                `SELECT notification.id, notification.title, notification.created_at, movies.slug, movies.image,notification.is_read 
                 FROM notification 
                 JOIN users ON notification.user_id = users.id 
                 JOIN movies ON notification.movie_id = movies.id 
                 WHERE user_id = $1 ORDER BY created_at DESC ${limitSql}`,
                [user_id]
            );
            return {
                message: "Lấy danh sách thông báo thành công!",
                data: res.rows
            };
        },
        options: {
            request: request,
            checkAuth: "isUser"
        }
    });
}
