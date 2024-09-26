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
            return !!auth;
        },
        jwt({ token, user, trigger, session }) {
            // console.log("🚀 ~ jwt ~ token, user, trigger, session:", token, user, trigger, session);

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
            // console.log("🚀 ~ session ~  session, token:",  session, token)
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        }
    },
    pages: {
        signIn: "/dang-nhap"
    }
});
