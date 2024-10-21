import { NextRequest } from "next/server";
import { RouterHandler } from "../router.handler";

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, user_id) {
            await pool.query("UPDATE notification SET is_read = true WHERE user_id = $1 AND is_read = false", [
                user_id
            ]);
            return {
                message: "Đã đọc thông báo!",
                data: []
            };
        },
        options: {
            request: request,
            checkAuth: "isUser"
        }
    });
}
