import { isEmail } from "@/base/utils/function";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { RouterHandler } from "../../router.handler";

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            if (!isEmail(body.email)) {
                throw new Error("Email không đúng định dạng!");
            }
            //Kiểm tra tài khoản đã tồn tại chưa?
            const existUser = await pool.query("SELECT users.email  FROM users  WHERE users.email = $1", [body.email]);
            if (existUser.rows.length > 0) {
                throw new Error("Tài khoản đã tồn tại!");
            }
            //Mã hóa mật khẩu
            const saltRounds = 10;
            const hashPassword = bcrypt.hashSync(body.password, saltRounds);

            //Tạo tài khoản
            let user_id = uuidv4();
            await pool.query("INSERT INTO users (id,email,password,username) VALUES ($1,$2,$3,$4) RETURNING *", [
                user_id,
                body.email,
                hashPassword,
                body.username
            ]);

            return {
                message: "Đăng ký tài khoản thành công!",
                data: []
            };
        },
        options: {
            request: request,
            required: ["email", "password", "username"]
        }
    });
}
