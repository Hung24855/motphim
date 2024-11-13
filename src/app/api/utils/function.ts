import { generateRandomCode } from "@/base/utils/function";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { NewToken } from "../quen-mat-khau/type";

export const genneralAccessToken = async <T extends object>(payload: T, expiresIn: string = "60s"): Promise<string> => {
    const access_token = jwt.sign(
        {
            ...payload
        },
        "secretKey",
        { expiresIn }
    );
    return access_token;
};

export const verifyToken = <T = { code: string }>(token: string, secretKey: string) => {
    return new Promise<T>((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded as T);
        });
    });
};

export const checkVerificationCode = async <T = NewToken>(token: string) => {
    try {
        const decoded = await verifyToken<T>(token, "secretKey");
        return decoded;
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            throw new Error("Quá thời gian chờ vui lòng thực hiện lại!");
        }
        throw new Error("Có lỗi xảy ra vui long thử lại sau!");
    }
};

export const sendEmail = async (email: string) => {
    const code = generateRandomCode();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    await transporter
        .sendMail({
            from: process.env.EMAIL_ACCOUNT,
            to: email,
            subject: "Mã xác nhận quên mật khẩu!",
            html: `Mã xác nhận của bạn là : ${code}`
        })
        .catch((error) => console.error(">>>Lỗi khi gửi Email", error));
    return code;
};
