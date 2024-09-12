import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface CredentialsType {
    email: string;
    password: string;
}
export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
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

                // console.log("response: ", response);

                if (response.status === "error") return null;

                if (response.data) user = response.data[0];
                return user;

                // console.log("email, password: ", email, password);
                //Kiểm tra tài khoản đã tồn tại chưa
                // const existUser = await pool.query(
                //     "SELECT users.email, users.password  FROM users  WHERE users.email = $1",
                //     [email]
                // );
                // console.log("existUser: ", existUser.rows , existUser.rows.length === 0);

                // if (existUser.rows.length === 0) return null;
                //Check mật khẩu
                // const isMatch = bcrypt.compareSync(password as string | Buffer, existUser.rows[0]?.password);

                // if (!isMatch) return null;

                // return existUser.rows[0];
            }
        })
    ],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            // console.log("dhkjfhdkhfkjdhsfjkdhskfjd: ", auth);
            // console.log("pathname: ", pathname);

            const role = auth?.user?.role || "user";
            if (pathname.startsWith("/dang-nhap") && isLoggedIn) {
                return Response.redirect(new URL("/", nextUrl));
            }
            if (pathname.startsWith("/admin") && role !== "admin") {
                return Response.redirect(new URL("/", nextUrl));
            }
            return !!auth;
        },
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role as string;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        }
    },
    pages: {
        signIn: "/dang-nhap"
    }
});
