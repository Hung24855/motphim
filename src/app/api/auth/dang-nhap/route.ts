import bcrypt from "bcrypt";
import { pool } from "@/database/connect";
import { NextResponse } from "next/server";
import { status } from "../../utils/status";
import { Exception } from "../../utils/Exception";
type BodyRegisterField = {
    email: string;
    password: string;
};

export async function POST(request: Request) {
    try {
        const body: BodyRegisterField = await request.json();

        if (!body.email || !body.password) {
            throw new Error("Vui lòng đièn đầy đủ thông tin!");
        }

        //Kiểm tra tài khoản đã tồn tại chưa
        const existUser = await pool.query(
            "SELECT *  FROM users  WHERE users.email = $1",
            [body.email]
        );
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
        return NextResponse.json({ status: status.success, message: "Đăng nhập thành công!", data: [{ ...user }] });
    } catch (error) {
        return NextResponse.json(Exception(error));
    }
}
