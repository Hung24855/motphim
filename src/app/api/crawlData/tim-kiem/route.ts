import axios from "axios";
import { NextRequest } from "next/server";
import { RouterHandler } from "../../router.handler";
import { MovieDetail, MoviesSearch } from "./../type";

export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc() {
            let query = request.nextUrl.searchParams.get("q") ?? "";

            const { data: moviesSearch } = await axios.get<MoviesSearch>(
                `https://ophim1.com/v1/api//tim-kiem?keyword=${query}`
            );
            const slugs = moviesSearch?.data?.items.map((item) => item.slug);
            const fetchMovieDetail = async (slug: string) => {
                try {
                    const { data: movieDetail } = await axios.get<{ data: MovieDetail }>(
                        `https://ophim1.com/v1/api/phim/${slug}`
                    );
                    const item = movieDetail?.data.item;
                    if (!item) return null;

                    const episode_current = item.episode_current.toLowerCase().includes("trọn bộ")
                        ? "Full"
                        : extractEpisodeNumber(item.episode_current);
                    const episode_total = extractEpisodeNumber(item.episode_total);
                    const time_per_episode =
                        item.time.includes("0") ||
                        item.time.includes("undefined") ||
                        item.time.includes("null") ||
                        item.time.includes("Đang")
                            ? "? Phút/tập"
                            : item.time.replace("p", " P");

                    return {
                        movie_name: item.name,
                        slug,
                        image: movieDetail?.data.seoOnPage.seoSchema.image,
                        content: item.content,
                        time_per_episode: time_per_episode || "? Phút/tập",
                        episode_current,
                        episode_total,
                        year: item.year,
                        movie_type_id: episode_total === "1" ? "type2" : "type1",
                        genres: item.category.map((category) => category.slug),
                        countries: item.country.map((country) => country.slug),
                        episodes: item.episodes[0].server_data.map((episode) => ({
                            link: episode.link_embed,
                            slug: `tap-${episode.slug}`,
                            name: extractEpisodeNumber(episode.slug)
                        }))
                    };
                } catch (error) {
                    console.error(`>>>Lỗi khi lấy chi tiết phim: ${slug}`, error);
                    return null;
                }
            };

            const extractEpisodeNumber = (episodeString: string) => {
                const match = episodeString.match(/(\d+)/);
                return match ? match[0] : "1"; // Trả về số đầu tiên tìm thấy
            };
            // Lấy chi tiết tất cả phim
            const promises = slugs.filter((item) => item !== undefined).map((item) => fetchMovieDetail(item as string));
            const data = (await Promise.all(promises)).filter((item) => item !== null);

            return {
                message: "Tìm kiếm phim thành công!",
                data: data
            };
        }
    });
}
