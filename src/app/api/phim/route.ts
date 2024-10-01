import { pool } from "@/database/connect";
import { Episode } from "@/domain/phim/dto";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { status } from "../utils/status";
import { Exception } from "../utils/Exception";
import CheckAdmin from "../middleware";


export async function POST(request: NextRequest) {
    try {
        const is_admin = await CheckAdmin(request);
        if (!is_admin) {
            throw new Error("Bạn không đủ quyền hạn để làm điều này!");
        }

        const body = await request.json();

        const requiredFields = [
            "countriesId",
            "genresId",
            "episode_current",
            "time_per_episode",
            "episodes",
            "movie_name",
            "movie_type_id",
            "quality",
            "image",
            "episode_total",
            "year",
            "content",
            "slug"
        ].filter((field) => !body[field]);

        if (requiredFields.length > 0) {
            throw new Error("Vui lòng điền đầu đủ thông tin");
        }

        const movie_id = uuidv4();

        let sql_insert_movie = `INSERT INTO movies 
        (id, movie_name, slug,content,title_head,image,time_per_episode, episode_current,episode_total,movie_type_id,trailer_youtube_url) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

        await pool.query(
            sql_insert_movie,
            [
                movie_id,
                body.movie_name,
                body.slug,
                body.content,
                body.movie_name,
                body.image,
                body.time_per_episode,
                body.episode_current,
                body.episode_total,
                body.movie_type_id,
                body.trailer_youtube_url
            ],
            (error, Result) => {
                if (error) {
                    throw new Error(error.message);
                }

                const queries = [
                    ...body.countriesId.map((country_id: any) => ({
                        query: "INSERT INTO movie_country (movie_id,country_id) VALUES ($1,$2)",
                        values: [movie_id, country_id]
                    })),
                    ...body.genresId.map((genre_id: any) => ({
                        query: "INSERT INTO movie_genre (movie_id,genres_id) VALUES ($1,$2)",
                        values: [movie_id, genre_id]
                    })),
                    ...body.episodes.map((episode: Episode) => {
                        let episode_id = uuidv4();
                        return {
                            query: "INSERT INTO episodes (episode_id,movie_id, name, link, slug) VALUES ($1, $2, $3, $4, $5)",
                            values: [episode_id, movie_id, episode.name, episode.link, episode.slug]
                        };
                    })
                ];
                // Run all queries
                const promises = queries.map(({ query, values }) => pool.query(query, values));
                Promise.all(promises)
                    .then(() => {
                        return NextResponse.json({ status: status.success, message: "Thêm phim thành công", data: [] });
                    })
                    .catch((error) => {
                        throw new Error(error.message);
                    });
            }
        );

        return NextResponse.json({ status: status.success, message: "Thêm phim thành công", data: [] });
    } catch (error) {
        return NextResponse.json(Exception(error));
    }
}
