import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";
import { checkVerificationCode, genneralAccessToken } from "../../utils/function";
import { NewToken } from "../type";

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            const token = await pool.query("SELECT password_reset_token FROM users WHERE email = $1", [body.email]);
            const decode = await checkVerificationCode(token.rows[0]?.password_reset_token);
            if (decode.code !== body.code) {
                throw new Error("Mã xác nhận không chính xác!");
            }
            const newtoken = await genneralAccessToken<NewToken>({ code: decode.code, email: body.email }, "10m");

            // Update token mới để check đổi mật khẩu
            await pool.query("UPDATE users SET password_reset_token = $1 WHERE email = $2", [newtoken, body.email]);
            return {
                message: "Mã xác nhận chính xác!",
                data: {
                    token: newtoken
                }
            };
        },
        options: {
            request: request,
            required: ["code", "email"]
        }
    });
}
