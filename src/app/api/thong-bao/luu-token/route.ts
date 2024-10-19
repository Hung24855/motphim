import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, user_id, body) {
            await pool.query("UPDATE users SET token_notification = $1 WHERE id = $2 ", [body.token, user_id]);
            return {
                message: "Lưu token thành công!",
                data: []
            };
        },
        options: {
            request: request,
            checkAuth: "isUser",
            required: ["token"]
        }
    });
}
