import { pool } from "@/database/connect";
import { Episode } from "@/domain/phim/dto";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

type PostEpisodesFields = {
    episodes: Episode[];
};

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    //slug = movie_id
    try {
        const body = (await request.json()) as PostEpisodesFields;

        if (!body.episodes || body.episodes.length === 0) {
            return NextResponse.json({
                status: "error",
                message: `Vui là điền dữ liệu: [episodes]`,
                data: []
            });
        }

        const queries = [
            ...body.episodes.map((episode: Episode) => {
                let episode_id = uuidv4();
                return {
                    query: "INSERT INTO episodes (episode_id,movie_id, name, link, slug) VALUES ($1, $2, $3, $4, $5)",
                    values: [episode_id, params.slug, episode.name, episode.link, episode.slug]
                };
            })
        ];
        const promises = queries.map(({ query, values }) => pool.query(query, [...values]));
        Promise.all(promises)
            .then(() => {
                return NextResponse.json({ status: "success", message: "Thêm tập phim thành công!", data: [] });
            })
            .catch((error) => {
                console.log("Error: ", error);
                return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
            });
        return NextResponse.json({ status: "success", message: "Thêm tập phim thành công!", data: [] });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    //slug = episode_id
    try {
        const res = await pool.query("DELETE FROM episodes WHERE episode_id = $1", [params.slug]);
        return NextResponse.json({ status: "success", message: "Xóa tập phim thành công!", data: [] });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
type PutEpisodesFields = {
    episodes: Episode;
};
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    //slug = episode_id
    try {
        const body = (await request.json()) as PutEpisodesFields;

        if (!body.episodes) {
            return NextResponse.json({
                status: "error",
                message: `Vui là điền dữ liệu: [episodes]`,
                data: []
            });
        }

        const res = await pool.query(
            "UPDATE episodes SET name = $1, link = $2, slug = $3 WHERE episode_id = $4 returning *",
            [body.episodes.name, body.episodes.link, body.episodes.slug, params.slug]
        );

        return NextResponse.json({ status: "success", message: "Cập nhật tập phim thành công!", data: res.rows });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}

