import { NextRequest } from "next/server";
import { RouterHandler } from "../router.handler";

export async function PUT(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, user_id, body) {
            const res = await pool.query("UPDATE users SET username = $1, avatar = $2  WHERE id = $3 RETURNING *", [
                body.username,
                body.avatar,
                user_id
            ]);
            const { password, ...user } = res.rows[0];

            return {
                message: "Cập nhật thông tin thành công!",
                data: [{ ...user }]
            };
        },
        options: {
            request: request,
            checkAuth: "isUser",
            required: ["username","avatar"]
        }
    });
}
