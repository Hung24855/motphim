import { NextRequest } from "next/server";
import { getMessaging, MulticastMessage } from "firebase-admin/messaging";
import { adminApp } from "../firebase.admin";
import { RouterHandler } from "../router.handler";

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            //Lấy danh sách token yêu thích movie_id
            const [response, movie_info] = await Promise.all([
                pool.query(
                    "SELECT token_notification as token FROM users INNER JOIN favorites ON users.id = favorites.user_id  WHERE movie_id=$1",
                    [body.movie_id]
                ),
                pool.query("SELECT slug, movie_name FROM movies WHERE id = $1", [body.movie_id])
            ]);

            const tokens: string[] = response.rows.map((item) => item.token);

            const message: MulticastMessage = {
                tokens: tokens,
                //Cấu hình thông báo cho nền tảng web
                webpush: {
                    fcmOptions: {
                        link: `http://localhost:3000/phim/${movie_info.rows[0].slug}`
                    },
                    notification: {
                        icon: "https://firebasestorage.googleapis.com/v0/b/themovie-af1e4.appspot.com/o/Logo-light.png?alt=media&token=a18772c3-b1dc-422d-9dd8-92c8f0523889",
                        title: "Motphim ❤️",
                        body: `${movie_info.rows[0].movie_name} đã ra tập mới!`,
                        sound: "default"
                    }
                }
            };
            getMessaging(adminApp).sendEachForMulticast(message);

            return { message: "Gửi thông báo thành công!", data: [] };
        },

        options: {
            request: request,
            checkAuth: "isAdmin",
            requiredFields: ["movie_id"]
        }
    });
}
