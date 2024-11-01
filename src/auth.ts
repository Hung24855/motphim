import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt"
        // maxAge: 60 * 60 * 14 // 1 Ngày hết hạn sesstion
        // updateAge: 60 * 60 * 2 // Làm mới lại sesstion sau 2 giờ
    },
    cookies: {
        sessionToken: {
            options: {
                secure: false
            }
        }
    },
    trustHost: true,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials, req) {
                let user = null;
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;

                const { email, password } = credentials;
                const response = await fetch(baseUrl + "/auth/dang-nhap", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }).then((res) => res.json());

                if (response.status === "error") return null;

                if (response.data) user = response.data[0];
                return user;
            }
        })
    ],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            const role = auth?.user?.role || "user";
            if (pathname.startsWith("/dang-nhap") && isLoggedIn) {
                return Response.redirect(new URL("/", nextUrl));
            }
            if (pathname.startsWith("/admin") && role !== "admin") {
                return Response.redirect(new URL("/", nextUrl));
            }
            if (pathname.startsWith("/trang-ca-nhan") && !isLoggedIn) {
                return Response.redirect(new URL("/", nextUrl));
            }
            return !!auth;
        },
        jwt({ token, user, trigger, session }) {
            //người dùng vừa đăng nhập, hàm này thêm id và role của người dùng vào token.
            if (user) {
                token.id = user.id as string;
                token.role = user.role as string;
                token.username = user.username as string;
                token.avatar = user.avatar as string;
            }
            if (trigger === "update" && session) {
                token = { ...session };
            }
            return token;
        },
        session({ session, token }) {
            //Nó cho phép bạn tùy chỉnh nội dung của session trước khi nó được gửi đến client.
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.username = token.username;
            session.user.avatar = token.avatar;

            return session;
        }
    },
    pages: {
        signIn: "/dang-nhap"
    }
});
