import { pool } from "@/database/connect";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
const secret = process.env.NEXTAUTH_SECRET ?? "AUTH_SECRET";
const CheckAdmin = async (request: NextRequest) => {
    try {

        const cookie = cookies();
        console.log("🚀 ~ CheckAdmin ~ cookie:", cookie)
        const token_product = await getToken({ req: request, secret: secret, salt: "__Secure-authjs.session-token" });
        const local_token = await getToken({ req: request, secret: secret, salt: "authjs.session-token" });
        console.log("🚀 ~ CheckAdmin ~ token_product:", token_product);
        console.log("🚀 ~ CheckAdmin ~ local_token:", local_token)

        const check_admin_in_DB = await pool.query("SELECT role FROM users WHERE id = $1", [token_product?.id]);

        if (!token_product || token_product.role !== "admin") {
            return false;
        }
        if (token_product.role === "admin" && check_admin_in_DB.rows[0].role === "admin") {
            return true;
        }
    } catch (error) {
        console.log("Error: middleware", error);
        return false;
    }
};
export const getUserIdByTokenNextAuth = async (request: NextRequest) => {
    try {
        const token_product = await getToken({ req: request, secret: secret, salt: "__Secure-authjs.session-token" });
        if (!token_product) {
            return null;
        }
        return token_product.id;
    } catch (error) {
        console.log("Error: getUserIdByTokenNextAuth", error);
        return null;
    }
};
export default CheckAdmin;
