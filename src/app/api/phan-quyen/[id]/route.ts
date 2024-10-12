import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    return RouterHandler({
        async mainFc(pool) {
            await pool.query("UPDATE users SET role = $1 WHERE id = $2 ", [body.role, params.id]);

            return { message: "Cập nhật quyền thành công!", data: [] };
        },
        options: {
            request: request,
            checkAuth: "isAdmin",
            checkRequired: {
                body: body,
                requiredFields: ["role"]
            }
        }
    });
}
