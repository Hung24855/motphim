import { NextRequest } from "next/server";
import { RouterHandler } from "../router.handler";
import { genneralAccessToken, sendEmail } from "../utils/function";

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool) {
            const body = await request.json();
            const existUser = await pool.query("SELECT *  FROM users  WHERE users.email = $1", [body.email]);
            if (existUser.rows.length == 0) {
                throw new Error("Tài khoản không tồn tại!");
            }
            const code = await sendEmail(body.email);
            const token = await genneralAccessToken<{ code: string }>({ code }, "2m");
            // Update token cho việc verify code
            pool.query("UPDATE users SET password_reset_token = $1 WHERE email = $2", [token, body.email]);

            return {
                message: "Gửi Email thành công!",
                data: []
            };
        }
    });
}
