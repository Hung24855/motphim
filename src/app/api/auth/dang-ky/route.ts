import { isEmail } from "@/base/utils/function";
import { NextResponse } from "next/server";
import { pool } from "@/database/connect";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
// import { signUpSchema } from "@/utils/zod";

type BodyRegisterField = {
    email: string;
    password: string;
    username: string;
};

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body: BodyRegisterField = await request.json();
        // const requireField = signUpSchema.safeParse(body);
        // console.log("requireField: ", requireField.data);
        // const schemaWithoutPassword = signUpSchema.omit({ password: true });

        if (!body.email || !body.password || !body.username) {
            return NextResponse.json({
                status: "error",
                message: "Vui lòng nhập đầy đủ: email, password, username",
                data: []
            });
        }

        if (!isEmail(body.email)) {
            return NextResponse.json({ status: "error", message: "Email không đúng định dạng", data: [] });
        }

        //Kiểm tra tài khoản đã tồn tại chưa
        const existUser = await pool.query("SELECT users.email  FROM users  WHERE users.email = $1", [body.email]);
        console.log("existUser: ", existUser.rows);

        if (existUser.rows.length > 0) {
            return NextResponse.json({
                status: "error",
                message: "Tài khoản đã tồn tại!",
                data: []
            });
        }
        //Mã hóa mật khẩu
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(body.password, saltRounds);

        //Tạo tài khoản
        let user_id = uuidv4();
        const res_create_user = await pool.query(
            "INSERT INTO users (id,email,password,username) VALUES ($1,$2,$3,$4) RETURNING *",
            [user_id, body.email, hashPassword, body.username]
        );

        //Trả response

        return NextResponse.json({
            status: "success",
            message: "Đăng ký tài khoản thành công!",
            data: []
        });
    } catch (error) {
        console.error("Error: Dang-ky", error);

        return NextResponse.json({
            status: "error",
            message: "Có lỗi xảy ra",
            data: []
        });
    }
}
