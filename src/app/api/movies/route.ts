import { pool } from "@/database/connect";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const res = await pool.query("SELECT * FROM movies");
    return NextResponse.json({ data: res.rows });
}
