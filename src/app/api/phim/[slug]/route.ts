import { pool } from "@/database/connect";
import { Episode } from "@/domain/phim/dto";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        let join = `INNER JOIN movie_genre ON movies.id = movie_genre.movie_id 
             INNER JOIN genres ON movie_genre.genres_id = genres.id`;

        const res = await pool.query(
            "SELECT movies.*, genres.name AS genre,genres.slug AS genre_slug  FROM movies " +
                join +
                " WHERE movies.slug = $1",
            [params.slug]
        );
        if (res.rows.length === 0) {
            return NextResponse.json({
                status: "success",
                message: "Phim không tồn tại!",
                data: []
            });
        }

        //Lấy thông tin thể loại
        const genres = (
            await pool.query(
                "SELECT movie_genre.*,genres.name ,genres.slug FROM movie_genre INNER JOIN genres ON movie_genre.genres_id = genres.id WHERE movie_id = $1",
                [res.rows[0]?.id]
            )
        ).rows;

        //Lấy thông tin quốc gia
        const countries = (
            await pool.query(
                "SELECT movie_country.*,countries.name,countries.slug FROM movie_country INNER JOIN countries ON movie_country.country_id = countries.id WHERE movie_id = $1",
                [res.rows[0]?.id]
            )
        ).rows;

        // console.log("res: ", res.rows[0]);

        const episodes = (await pool.query("SELECT * FROM episodes WHERE movie_id = $1", [res.rows[0]?.id])).rows;

        return NextResponse.json({
            status: "success",
            message: "Lấy thông tin chi tiết phim thành công!",
            data: [
                {
                    ...res.rows[0],
                    episodes,
                    genres,
                    countries
                }
            ]
        });
    } catch (error) {
        console.log("Error: get_movie", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}

type UpdateMovieFields = {
    countries_movies: {
        id: number;
        country_id: number;
    }[];
    genres_movies: {
        id: number;
        genre_id: number;
    }[];
    episode_current: string;
    time_per_episode: string;
    episodes: Episode[];
    movie_name: string;
    quality: string;
    image: string;
    episode_total: string;
    year: string;
    content: string;
    slug: string;
    trailer_youtube_url: string;
    movie_type_id: string;
};

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
    try {
        const body = (await request.json()) as UpdateMovieFields;
        const requiredFields: Array<keyof UpdateMovieFields> = [
            "countries_movies",
            "genres_movies",
            "episode_current",
            "time_per_episode",
            "episodes",
            "movie_name",
            "quality",
            "image",
            "episode_total",
            "year",
            "content",
            "slug"
        ];
        // Check missing fields
        const missingFields = requiredFields.filter((key) => !(key in body));
        if (missingFields.length > 0) {
            return NextResponse.json({
                status: "error",
                message: `Thiếu các trường sau: ${missingFields.join(", ")}`,
                data: []
            });
        }

        // Cập nhật phim

        let sql_update_movie = `UPDATE movies SET
         movie_name = $1, slug = $2,content = $3,title_head = $4,image = $5,
         time_per_episode = $6, episode_current = $7,episode_total = $8,movie_type_id = $9,trailer_youtube_url = $10
         WHERE id=$11`;

        const result = await pool.query(
            sql_update_movie,
            [
                body.movie_name,
                body.slug,
                body.content,
                body.movie_name,
                body.image,
                body.time_per_episode,
                body.episode_current,
                body.episode_total,
                body.movie_type_id,
                body.trailer_youtube_url,
                params.slug
            ],
            async (Error, Result) => {
                if (Error) {
                    return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
                }

                //Lấy thông tin các danh mục| quốc gia hiện tại

                const genres_current = await pool.query("SELECT id FROM movie_genre WHERE movie_id = $1", [
                    params.slug
                ]);
                const countries_current = await pool.query("SELECT id FROM movie_country WHERE movie_id = $1", [
                    params.slug
                ]);

                //Xóa nhưng danh mục không có trong lựa chọn mới

                await pool.query("DELETE FROM movie_genre WHERE movie_id = $1", [params.slug]);

                //Thêm mới những lựa chọn không có trong DB

                // const queries = [
                //     ...body.countries_movies.map((countries_movie) => ({
                //         query: "UPDATE movie_country SET country_id = $1 WHERE id = $2",
                //         values: [countries_movie.country_id, countries_movie.id]
                //     })),
                //     ...body.genres_movies.map((genres_movie) => ({
                //         query: "UPDATE movie_genre SET genres_id = $1 WHERE id = $2",
                //         values: [genres_movie.genre_id, genres_movie.id]
                //     })),
                //     ...body.episodes.map((episode) => {
                //         let episode_id = uuidv4();
                //         return {
                //             query: "INSERT INTO episodes (episode_id,movie_id, name, link, slug) VALUES ($1, $2, $3, $4, $5)",
                //             values: [episode_id, params.slug, episode.name, episode.link, episode.slug]
                //         };
                //     })
                // ];

                // // console.log("queries", queries);

                // // Run all queries
                // const promises = queries.map(({ query,values }) => pool.query(query, [...values]));
                // Promise.all(promises)
                //     .then(() => {
                //         return NextResponse.json({ status: "success", message: "Cập nhật phim thành công", data: [] });
                //     })
                //     .catch((error) => {
                //         console.log("Error: ", error);
                //         return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
                //     });
            }
        );

        return NextResponse.json({ status: "success", message: "Cập nhật phim thành công!", data: [] });
    } catch (error) {
        console.log("Error: update_movie", error);

        return NextResponse.json({ status: "error", message: "Có lỗi xảy ra", data: [] });
    }
}
