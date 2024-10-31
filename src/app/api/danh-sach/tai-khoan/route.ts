import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";
export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool) {
            const accounts = await pool.query(
                `SELECT users.id, users.email,users.username,users.role,users.created_at,users.updated_at 
                 FROM users 
                 WHERE email != 'admin@gmail.com'`
            );
            return {
                message: "Lấy danh sách tài khoản thành công!",
                data: accounts.rows
            };
        },
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}
