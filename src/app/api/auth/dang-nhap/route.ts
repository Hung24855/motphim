import bcrypt from "bcrypt";
import { pool } from "@/database/connect";
import { NextResponse } from "next/server";
type BodyRegisterField = {
    email: string;
    password: string;
};

export async function POST(request: Request) {
    try {
        const body: BodyRegisterField = await request.json();

        if (!body.email || !body.password) {
            return NextResponse.json({
                status: "error",
                message: `Vui lòng điền đầy đủ các trường`,
                data: []
            });
        }

        //Kiểm tra tài khoản đã tồn tại chưa
        const existUser = await pool.query(
            "SELECT users.id, users.email,users.password,users.username,users.role  FROM users  WHERE users.email = $1",
            [body.email]
        );
        if (existUser.rows.length == 0) {
            return NextResponse.json({
                status: "error",
                message: `Thông tin tài khoản hoặc mật khẩu không chính xác!`,
                data: []
            });
        }

        // console.log("existUser: ", existUser.rows);

        //Check mật khẩu
        const isMatch = bcrypt.compareSync(body.password, existUser.rows[0].password);

        if (!isMatch) {
            return NextResponse.json({
                status: "error",
                message: `Thông tin tài khoản hoặc mật khẩu không chính xác!`,
                data: []
            });
        }

        //Bỏ mật khẩu khỏi response
        const { password, ...user } = existUser.rows[0];
        return NextResponse.json({ status: "success", message: "Đăng nhập thành công!", data: [{ ...user }] });
    } catch (error) {
        console.log("Error: login", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
