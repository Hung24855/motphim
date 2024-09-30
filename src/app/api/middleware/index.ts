import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
const secret = process.env.NEXTAUTH_SECRET ?? "";
const checkAdmin = async (request: NextRequest) => {
    try {
        // const token = await getToken({ req: request, secret: secret, salt: "authjs.session-token" });
        // console.log("token", token);
        // token {
        //     email: 'admin@gmail.com',
        //     sub: '58c01d33-3677-443f-b14e-078d7f57bf5b',
        //     id: '58c01d33-3677-443f-b14e-078d7f57bf5b',
        //     role: 'admin',
        //     iat: 1727319791,
        //     exp: 1729911791,
        //     jti: 'e3287e36-e416-4e41-b81e-9addd405ab48'
        //   }
        const token = await getToken({ req: request, secret: secret, salt: "authjs.session-token" });
        if (!token || token.role !== "admin") {
            return false;
        }
        if (token.role === "admin") {
            return true;
        }
    } catch (error) {
        console.log("Error: middleware", error);
        return false;
    }
};
export const getUserIdByTokenNextAuth = async (request: NextRequest) => {
    try {
        const token = await getToken({ req: request, secret: secret, salt: "authjs.session-token" });
        if (!token) {
            return null;
        }
        return token.id;
    } catch (error) {
        console.log("Error: getUserIdByTokenNextAuth", error);
        return null;
    }
};
export default checkAdmin;
