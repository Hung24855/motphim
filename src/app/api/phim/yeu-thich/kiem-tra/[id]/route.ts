import { RouterHandler } from "@/app/api/router.handler";
import { NextRequest } from "next/server";

// Kiểm tra phim đã được yêu thích chưa
//id = movie_id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    return RouterHandler({
        async mainFc(pool, user_id) {
            const res = await pool.query("SELECT * FROM favorites WHERE user_id= $1 AND movie_id=$2", [
                user_id,
                params.id
            ]);

            return {
                message: res.rows.length > 0 ? "Phim đã được yêu thích" : "Phim chưa được yêu thích",
                data: {
                    id: params.id,
                    is_favorites: res.rows.length > 0
                }
            };
        },
        options: {
            request: request,
            checkAuth: "isUser"
        }
    });
}
