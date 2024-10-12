import { RouterHandler } from "@/app/api/router.handler";
import { Episode } from "@/domain/phim/dto";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

type PostEpisodesFields = {
    episodes: Episode[];
};

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
    //slug = movie_id

    return RouterHandler({
        async mainFc(pool) {
            const body = (await request.json()) as PostEpisodesFields;

            if (!body.episodes || body.episodes.length === 0) {
                throw new Error("Vui lòng điền đầy đủ thông tin!");
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
                    return { message: "Thêm tập phim thành công!", data: [] };
                })
                .catch((error) => {
                    throw new Error(error.message);
                });
            return { message: "Thêm tập phim thành công!", data: [] };
        },
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
    //slug = episode_id

    return RouterHandler({
        async mainFc(pool) {
            await pool.query("DELETE FROM episodes WHERE episode_id = $1", [params.slug]);
            return {
                message: "Xóa tập phim thành công!",
                data: {
                    id: params.slug
                }
            };
        },
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}
type PutEpisodesFields = {
    episodes: Episode;
};
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    //slug = episode_id

    return RouterHandler({
        async mainFc(pool) {
            const body = (await request.json()) as PutEpisodesFields;

            if (!body.episodes) {
                throw new Error("Vui lòng điền đầy đủ thông tin");
            }

            const res = await pool.query(
                "UPDATE episodes SET name = $1, link = $2, slug = $3 WHERE episode_id = $4 returning *",
                [body.episodes.name, body.episodes.link, body.episodes.slug, params.slug]
            );

            return {
                message: "Cập nhật tập phim thành công!",
                data: res.rows
            };
        },
        options: {
            request: request,
            checkAuth: "isAdmin"
        }
    });
}
