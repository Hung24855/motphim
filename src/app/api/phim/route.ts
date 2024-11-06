import { Episode } from "@/domain/phim/dto";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { RouterHandler } from "../router.handler";

export async function POST(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            const movie_id = uuidv4();

            pool.query(
                `INSERT INTO movies 
                 (id, movie_name, slug,content,title_head,image,time_per_episode, episode_current,episode_total,movie_type_id,trailer_youtube_url) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
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
                (error) => {
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
                    const promises = queries.map(({ query, values }) => pool.query(query, values));
                    Promise.all(promises)
                        .then(() => {
                            return {
                                message: "Thêm phim thành công",
                                data: []
                            };
                        })
                        .catch((error) => {
                            throw new Error(error.message);
                        });
                }
            );

            return { message: "Thêm phim thành công", data: [] };
        },

        options: {
            request: request,
            checkAuth: "isAdmin",
            required: [
                "countriesId",
                "genresId",
                "episode_current",
                "time_per_episode",
                "episodes",
                "movie_name",
                "movie_type_id",
                "image",
                "episode_total",
                "year",
                "content",
                "slug"
            ]
        }
    });
}


