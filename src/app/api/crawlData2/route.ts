import axios from "axios";
import { RouterHandler } from "../router.handler";
import * as cheerio from "cheerio";
import { NextRequest } from "next/server";
import { removeMark } from "@/base/utils/function";
import { Episode, Info, Movies } from "./type";
export const revalidate = 60 * 5;
export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc() {
            const listMovies: Movies = [];
            const slugs: string[] = [];

            const getSlugsMoviesPerPage = async (page: number = 1) => {
                try {
                    const { data: html } = await axios.get(`https://ophim17.cc/danh-sach/phim-moi?page=${page}`);
                    const $ = cheerio.load(html);
                    $("tbody tr").each((_, element) => {
                        const slug = $(element).find("td").eq(0).find("a").attr("href")?.replace("/phim/", "");
                        if (slug) slugs.push(slug);
                    });
                } catch (error) {
                    console.error("Lấy slug lỗi tại page: ", page);
                }
            };
            const getMovieDetail = async (slug: string) => {
                try {
                    const { data: html } = await axios.get(`https://ophim17.cc/phim/${slug}`);
                    const $ = cheerio.load(html);
                    const movie_name = $("h1").text();
                    const subtitle = $("h2").text();

                    const info: Info = {} as Info;
                    $("tbody tr").each((_, element) => {
                        const key = $(element).find("td").eq(0).text().trim();
                        const value = $(element).find("td").eq(1).text().trim();
                        // Đổi tên thuộc tính
                        switch (key) {
                            case "Trạng thái":
                                info["episode_current"] = extractNumber(value);
                                break;
                            case "Số tập":
                                info["episode_total"] = extractNumber(value);
                                info["movie_type_id"] = extractNumber(value) === "1" ? "type2" : "type1";
                                break;
                            case "Thời Lượng":
                                info["time_per_episode"] = value === "Đang cập nhật" ? "? Phút/tập" : value;
                                break;
                            case "Năm Phát Hành":
                                info["year"] = Number(value);
                                break;
                            case "Ngôn Ngữ":
                                info["lang"] = value;
                                break;
                            case "Thể Loại":
                                info["genres"] = value
                                    .split(", ")
                                    .map((text) =>
                                        removeMark(text.toLowerCase())
                                            .replace(" ", "-")
                                            .replace("đ", "d")
                                            .replace("đ", "D")
                                    );
                                break;
                            case "Quốc Gia":
                                info["countries"] = value
                                    .split(", ")
                                    .map((text) => removeMark(text.toLowerCase()).replace(" ", "-"));
                                break;
                            default:
                                break;
                        }
                    });

                    //Lấy nội dung phim
                    const content = $("article").text().trim();
                    const image = `https://img.ophim.live/uploads/movies/${slug}-thumb.jpg`;
                    const episodes: Episode[] = [];
                    const links = $("textarea").eq(0).text().trim().split("\n");

                    for (const item of links) {
                        let [name, link] = item.split("|");
                        name = extractNumber(name);
                        const episodeSlug = `tap-${name}`;
                        episodes.push({ name, link, slug: episodeSlug });
                    }

                    listMovies.push({ movie_name, slug, image, subtitle, ...info, content, episodes });
                } catch (error) {
                    console.error("Lấy chi thiết phim lỗi tại : ", slug);
                }
            };

            const searchParams = request.nextUrl.searchParams;
            const { start = "1", end = "1" } = Object.fromEntries(searchParams);

            const crawlData = async () => {
                const arrayPage = Array.from({ length: Number(end) - Number(start) + 1 }, (v, k) => k + Number(start)); //Tạo mảng tăng dần từ start đến end
                const promise = arrayPage.map((page) => getSlugsMoviesPerPage(page));
                await Promise.all(promise);
                // Đã lấy được danh sách slugs

                if (slugs.length > 0) {
                    const promise = slugs.map((slug) => getMovieDetail(slug));
                    await Promise.all(promise);
                }
            };

            await crawlData();

            return {
                message: "Crawl data thành công!",
                data: {
                    listMovies
                }
            };
        }
    });
}

const extractNumber = (episodeString: string) => {
    if (episodeString.startsWith("0")) {
        return episodeString.replace("0", "");
    }
    const match = episodeString.match(/(\d+)/);
    return match ? match[0] : "1"; // Trả về số đầu tiên tìm thấy
};
