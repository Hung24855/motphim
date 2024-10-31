import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            await pool.query("UPDATE users SET role = $1 WHERE id = $2", [body.role, params.id]);
            return { message: "Cập nhật quyền thành công!", data: [] };
        },
        options: {
            request: request,
            checkAuth: "isAdmin",
            required: ["role"]
        }
    });
}
