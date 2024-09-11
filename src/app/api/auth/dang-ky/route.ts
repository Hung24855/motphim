import { isEmail } from "@/base/utils/function";
import { NextResponse } from "next/server";

type BodyRegisterField = {
    email: string;
    password: string;
};

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body: BodyRegisterField = await request.json();

        if (!body.email || !body.password) {
            return NextResponse.json({
                status: "error",
                message: "Vui lòng nhập đầy đủ: email, password",
                data: []
            });
        }

        if (!isEmail(body.email)) {
            return NextResponse.json({ status: "error", message: "Email không đúng định dạng", data: [] });
        }

        // Perform additional validation or logic here

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
