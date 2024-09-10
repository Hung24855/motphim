import { pool } from "@/database/connect";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// type RequestBodyType = {
//     countriesId: number[];
//     genresId: number[];
//     episode_current: string;
//     time_per_episode: string;
//     episodes: {
//         name: string;
//         link: string;
//         slug: string;
//     }[];
//     movie_name: string;
//     movie_type_id: string;
//     quality: string;
//     image: string;
//     episode_total: string;
//     trailer_youtube_url: string;
//     year: string;
//     slug: string;
//     content: string;
// };

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body);

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
            return NextResponse.json({
                status: "error",
                message: `Vui lòng điền đầy đủ các trường: [${requiredFields.join(", ")}]`,
                data: []
            });
        }

        const movie_id = uuidv4();

        let sql_insert_movie = `INSERT INTO movies 
        (id, movie_name, slug,content,title_head,image,time_per_episode, episode_current,episode_total,movie_type_id,trailer_youtube_url) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

        const result = await pool.query(
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
            (Error, Result) => {
                if (Error) {
                    return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
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
                    ...body.episodes.map((episode: any) => {
                        let episode_id = uuidv4();
                        return {
                            query: "INSERT INTO episodes (episode_id,movie_id, name, link, slug) VALUES ($1, $2, $3, $4, $5)",
                            values: [episode_id, movie_id, episode.name, episode.link, episode.slug]
                        };
                    })
                ];

                // console.log("queries", queries);

                // Run all queries
                const promises = queries.map(({ query, values }) => pool.query(query, values));
                Promise.all(promises)
                    .then(() => {
                        return NextResponse.json({ status: "success", message: "Thêm phim thành công", data: [] });
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
                    });
            }
        );

        // return NextResponse.json({ status: "success", message: "Thêm phim thành công", data: [] });
        return NextResponse.json({ status: "success", message: "Thêm phim thành công", data: [] });
    } catch (error) {
        console.log("Error: ", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
