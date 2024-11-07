import { NextRequest } from "next/server";
import { RouterHandler } from "../router.handler";
export async function GET() {
    return RouterHandler({
        async mainFc(pool) {
            const res = await pool.query("SELECT * FROM genres");
            return {
                message: "Lấy danh sách thể loại thành công!",
                data: res.rows
            };
        }
    });
}

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            const res = await pool.query("INSERT INTO genres (name,slug) VALUES ($1,$2) RETURNING *", [
                body.name,
                body.slug
            ]);
            return { message: "Thêm thể loại thành công", data: res.rows };
        },
        options: {
            request: request,
            checkAuth: "isAdmin",
            required: ["name", "slug"]
        }
    });
}
