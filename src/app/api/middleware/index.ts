import { pool } from "@/database/connect";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ?? "";
const CheckAdmin = async (request: NextRequest) => {
    try {

        //Token local
        const token = await getToken({ req: request, secret: secret, salt: "authjs.session-token" });
        console.log("🚀 ~ CheckAdmin ~ secret:", secret)
        console.log("🚀 ~ CheckAdmin ~ token:", token)
        //Token product
        const token_product = await getToken({ req: request, secret: secret, salt: "__Secure-authjs.session-token" });
        console.log("🚀 ~ CheckAdmin ~ token_product:", token_product)

        const check_admin_in_DB = await pool.query("SELECT role FROM users WHERE id = $1", [
            token?.id ?? token_product?.id
        ]);

        if (!token || token.role !== "admin") {
            return false;
        }
        if (token.role === "admin" && check_admin_in_DB.rows[0].role === "admin") {
            return true;
        }
    } catch (error) {
        console.log("Error: middleware", error);
        return false;
    }
};
export const getUserIdByTokenNextAuth = async (request: NextRequest) => {
    try {

        //Token local
        const token = await getToken({ req: request, secret: secret, salt: "authjs.session-token" });
        console.log("🚀 ~ getUserIdByTokenNextAuth ~ token:", token)
        //Token product
        const token_product = await getToken({ req: request, secret: secret, salt: "__Secure-authjs.session-token" });
        console.log("🚀 ~ getUserIdByTokenNextAuth ~ token_product:", token_product)
        if (!token || !token_product) {
            return null;
        }
        return token.id ?? token_product.id;
    } catch (error) {
        console.log("Error: getUserIdByTokenNextAuth", error);
        return null;
    }
};
export default CheckAdmin;
