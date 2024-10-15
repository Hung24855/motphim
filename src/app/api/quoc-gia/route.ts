import { NextRequest } from "next/server";
import { RouterHandler } from "../router.handler";

export async function GET() {
    return RouterHandler({
        async mainFc(pool) {
            const res = await pool.query("SELECT * FROM countries");
            return {
                message: "Lấy thông tin quốc gia thành công",
                data: res.rows
            };
        }
    });
}

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            const res = await pool.query("INSERT INTO countries (name,slug) VALUES ($1,$2) RETURNING *", [
                body.name,
                body.slug
            ]);
            return { message: "Thêm quốc gia thành công", data: res.rows };
        },
        options: {
            checkAuth: "isAdmin",
            requiredFields: ["name", "slug"],
            request: request
        }
    });
}
