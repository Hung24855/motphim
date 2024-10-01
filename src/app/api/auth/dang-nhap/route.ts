import bcrypt from "bcrypt";
import { pool } from "@/database/connect";
import { NextResponse } from "next/server";
import { responseError, responseRequired } from "../../utils/response";
import { status } from "../../utils/status";
type BodyRegisterField = {
    email: string;
    password: string;
};

export async function POST(request: Request) {
    try {
        const body: BodyRegisterField = await request.json();

        if (!body.email || !body.password) {
            return NextResponse.json(responseRequired);
        }

        //Kiểm tra tài khoản đã tồn tại chưa
        const existUser = await pool.query(
            "SELECT users.id, users.email,users.password,users.username,users.role  FROM users  WHERE users.email = $1",
            [body.email]
        );
        if (existUser.rows.length == 0) {
            return NextResponse.json({
                status: status.error,
                message: `Tài khoản đã tồn tại!`,
                data: []
            });
        }

        // console.log("existUser: ", existUser.rows);

        //Check mật khẩu
        const isMatch = bcrypt.compareSync(body.password, existUser.rows[0].password);

        if (!isMatch) {
            return NextResponse.json({
                status: status.error,
                message: `Thông tin tài khoản hoặc mật khẩu không chính xác!`,
                data: []
            });
        }

        //Bỏ mật khẩu khỏi response
        const { password, ...user } = existUser.rows[0];
        return NextResponse.json({ status: status.success, message: "Đăng nhập thành công!", data: [{ ...user }] });
    } catch (error) {
        console.log("Error: login", error);
        return NextResponse.json(responseError);
    }
}
