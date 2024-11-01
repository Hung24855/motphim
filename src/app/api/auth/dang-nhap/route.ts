import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            //Kiểm tra tài khoản đã tồn tại chưa?
            const existUser = await pool.query("SELECT *  FROM users  WHERE users.email = $1", [body.email]);
            if (existUser.rows.length == 0) {
                throw new Error("Tài khoản đã tồn tại!");
            }
            //Check mật khẩu
            const isMatch = bcrypt.compareSync(body.password, existUser.rows[0].password);
            if (!isMatch) {
                throw new Error("Thông tin tài khoản hoặc mật khẩu không chính xác!");
            }

            //Bỏ mật khẩu khỏi response
            const { password, ...user } = existUser.rows[0];
            return { message: "Đăng nhập thành công!", data: [{ ...user }] };
        },
        options: {
            request: request,
            required: ["email", "password"]
        }
    });
}
