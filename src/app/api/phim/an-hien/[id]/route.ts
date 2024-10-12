import { RouterHandler } from "@/app/api/router.handler";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    return RouterHandler({
        async mainFc(pool) {
            const body: { is_visible: boolean } = await request.json();
            if (!body.is_visible === undefined) {
                throw new Error("Vui lòng điền đầy đủ thông tin");
            }

            await pool.query("UPDATE movies SET is_visible = $1 WHERE id = $2 RETURNING *", [
                body.is_visible,
                params.id
            ]);

            return {
                message: "Cập nhật ẩn hiện phim thành công",
                data: {
                    id: params.id,
                    is_visible: body.is_visible
                }
            };
        },
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}
