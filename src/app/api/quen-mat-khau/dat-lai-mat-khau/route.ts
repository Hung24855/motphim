import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";
import { checkVerificationCode } from "../../utils/function";

export async function PUT(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            const decode = await checkVerificationCode(body.token);
            const token = await pool.query("SELECT password_reset_token FROM users WHERE email = $1", [decode.email]);
            const decodeDB = await checkVerificationCode(token.rows[0]?.password_reset_token);
            if (decode.code !== decodeDB.code) {
                throw new Error("Mã xác nhận không chính xác!");
            }

            const saltRounds = 10;
            const hashPassword = bcrypt.hashSync(body.newPassword, saltRounds);
            await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashPassword, decode.email]);
            return {
                message: "Đổi mật khẩu thành công!",
                data: []
            };
        },
        options: {
            request: request,
            required: ["newPassword", "token"]
        }
    });
}
