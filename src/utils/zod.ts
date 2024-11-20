import { object, string, z } from "zod";

export const signInSchema = object({
    email: string().min(1, "Email không thể để trống!"),
    password: string().min(1, "Mật khẩu không thể để trống!")
});

export const signUpSchema = object({
    email: string().min(1, "Email không thể để trống!").email("Email không đúng định dạng!"),
    username: string().min(1, "Tên người dùng không thể để trống!"),
    password: string()
        .min(1, "Mật khẩu không thể để trống!")
        .min(8, "Mật khẩu cần tối thiểu 8 ký tự!")
        .max(32, "Mật khẩu tối đa 32 ký tự!"),
    confirm_password: z.string().min(1, "Xác nhận mật khẩu không thể để trống!")
}).refine((data) => data.password === data.confirm_password, {
    message: "Xác nhận mật khẩu không chính xác!",
    path: ["confirm_password"]
});

export const verifyEmailSchema = object({
    email: string().min(1, "Email không thể để trống!").email("Email không đúng định dạng!"),
});

export const resetPasswordSchema = object({
    password: string()
        .min(1, "Mật khẩu không thể để trống!")
        .min(8, "Mật khẩu cần tối thiểu 8 ký tự!")
        .max(32, "Mật khẩu tối đa 32 ký tự!"),
    confirm_password: z.string().min(1, "Xác nhận mật khẩu không thể để trống!")
}).refine((data) => data.password === data.confirm_password, {
    message: "Xác nhận mật khẩu không chính xác!",
    path: ["confirm_password"]
});

export type SignInType = z.infer<typeof signInSchema>;
export type SignUpType = z.infer<typeof signUpSchema>;
export type VerifyEmailType = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
