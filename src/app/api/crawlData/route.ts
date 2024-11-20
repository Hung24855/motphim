import http from "@/infrastructure/config/request";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import puppeteer, { Browser } from "puppeteer";
import { v4 as uuidv4 } from "uuid";
import { RouterHandler } from "../router.handler";
import { Episode, MovieDetail, Movies } from "./type";

export const revalidate = 0;
const IS_DEVELOPMENT = process.env.DEVELOPMENT === "development";

export async function GET(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool) {
            const createBrowser = async () => {
                let browser: Browser | null = null;
                console.log(">>>Đang mở trình duyệt...");
                //Local browser
                browser = await puppeteer.launch({
                    headless: true,
                    //Tin tưởng nội dung trang web hiện tại,nên đisible sandbox chặn lại trang web đó
                    args: ["--no-sandbox", "--disable-setuid-sandbox"],
                    defaultViewport: null
                });

                return browser;
            };
            const getRenges = async (browser: Browser) => {
                let page = await browser.newPage();
                await page.setViewport({ width: 1440, height: 1024 });
                let data: {
                    name: string | null;
                    slug: string | undefined;
                }[] = [];
                try {
                    await page.goto("https://ophim17.cc", { waitUntil: "networkidle2", timeout: 5000 });
                    //Chờ selector được tải xong
                    await page.waitForSelector("#headlessui-menu-button-1", { timeout: 5000 });
                    await page.locator("#headlessui-menu-button-1").click();

                    data = await page.evaluate(() => {
                        const elements = Array.from(
                            document.querySelectorAll(`[aria-labelledby="headlessui-menu-button-1"] button a.px-4.py-2`)
                        );

                        return elements.map((ele) => ({
                            name: ele.textContent,
                            slug: ele.getAttribute("href")?.toString().replace("/the-loai/", "")
                        }));
                    });
                    console.log(">>>Đã lấy dữ liệu thể loại...");
                } catch (error) {
                    console.error(">>>Lỗi khi lấy danh sách thể loại");
                } finally {
                    page.close();
                }

                return data;
            };
            const getCountries = async (browser: Browser) => {
                let page = await browser.newPage();
                await page.setViewport({ width: 1440, height: 1024 });
                let data: {
                    name: string | null;
                    slug: string | undefined;
                }[] = [];
                try {
                    await page.goto("https://ophim17.cc", { waitUntil: "networkidle2", timeout: 5000 });
                    await page.waitForSelector("#headlessui-menu-button-2", { timeout: 5000 });
                    await page.locator("#headlessui-menu-button-2").click();

                    data = await page.evaluate(() => {
                        const elements = Array.from(
                            document.querySelectorAll(`[aria-labelledby="headlessui-menu-button-2"] button a.px-4.py-2`)
                        );
                        return elements.map((ele) => ({
                            name: ele.textContent,
                            slug: ele.getAttribute("href")?.toString().replace("/quoc-gia/", "")
                        }));
                    });
                    console.log(">>>Đã lấy dữ liệu quốc gia...");
                    page.close();
                } catch (error) {
                    console.error(">>>Lỗi khi lấy danh sách quốc gia");
                } finally {
                    page.close();
                }

                return data;
            };
            const getListMovie = async ({ browser, page: p }: { browser: Browser; page: number }) => {
                const page = await browser.newPage();
                await page.setViewport({ width: 1440, height: 1024 });
                const movies: Movies = [];
                const url = `https://ophim17.cc/danh-sach/phim-moi?sort_field=modified.time&year=2024&page=${p}`;

                try {
                    console.log(`>>>Đang mở trang ${url}`);
                    await page.goto(url, { waitUntil: "networkidle2", timeout: 5000 });
                    await page.waitForSelector("table.divide-y", { timeout: 5000 });

                    const slugs = await page.$$eval("table.divide-y tbody tr", (rows) =>
                        rows.map((row) => ({
                            slug: row.querySelector("td a")?.getAttribute("href")?.replace("/phim/", "")
                        }))
                    );
                    // Lấy chi tiết tất cả phim
                    const promises = slugs
                        .filter((item) => item.slug !== undefined)
                        .map((item) => fetchMovieDetail(item.slug as string));
                    const data = await Promise.all(promises);
                    movies.push(...data.filter((item) => item !== null));

                    console.log(`>>>Đã lấy danh sách phim tại trang: ${p}`);
                } catch (error) {
                    console.error(`>>>Lỗi khi mở trang: ${p}`);
                } finally {
                    await page.close();
                }

                return movies;
            };
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
                        item.time.toLowerCase().includes("đang cập nhật")
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
            const crawlData = async () => {
                const browser = await createBrowser();
                if (!browser) return;

                const data: any = {};
                //Lấy thông tin thể loại và quốc gia
                // const genres = await getRenges(browser);
                // const countries = await getCountries(browser);
                const listMovies: Movies = [];

                const searchParams = request.nextUrl.searchParams;
                const { start = "1", end = "1" } = Object.fromEntries(searchParams);

                for (let i = Number(start); i <= Number(end); i++) {
                    const movies = await getListMovie({ browser, page: i });
                    listMovies.push(...movies);
                }
                //Thêm data
                // data.genres = genres;
                // data.countries = countries;
                data.listMovies = listMovies;
                //Ghi data vào file
                // fs.writeFile("data.json", JSON.stringify(data), (err) => {
                //     if (err) console.log("Ghi file lỗi", err);
                //     else console.log(">>>Ghi dữ liệu vào file xong!");
                // });

                await browser.close();
                console.log(">>>Đóng trình duyệt");
                return data;
            };
            const data = await crawlData();
            return {
                message: "Crawl data successfully!",
                data: data
            };
        }
    });
}

export async function PUT(request: NextRequest) {
    return RouterHandler({
        async mainFc(pool, _, body) {
            const checkExistMovie = await pool.query("SELECT id FROM movies WHERE slug = $1", [body.slug]);

            if (checkExistMovie.rows.length === 0) {
                // Nếu phim chưa tồn tại, thêm phim mới
                const [genresIdRes, countriesIdRes] = await Promise.all([
                    pool.query(`SELECT id FROM genres WHERE slug = ANY($1)`, [body.genres]),
                    pool.query(`SELECT id FROM countries WHERE slug = ANY($1)`, [body.countries])
                ]);
                const genresId = genresIdRes.rows.map((item) => item.id);
                const countriesId = countriesIdRes.rows.map((item) => item.id);

                // Lấy cookie next-auth
                const cookieStore = cookies();
                const token = cookieStore.get(
                    IS_DEVELOPMENT ? "authjs.session-token" : "__Secure-authjs.session-token"
                );

                // Thêm phim mới
                await http.post(
                    "/phim",
                    {
                        countriesId,
                        genresId,
                        episode_current: body.episode_current,
                        episode_total: body.episode_total,
                        time_per_episode: body.time_per_episode,
                        episodes: body.episodes,
                        movie_name: body.movie_name,
                        movie_type_id: body.movie_type_id,
                        image: body.image,
                        year: body.year,
                        slug: body.slug,
                        content: body.content
                    },
                    {
                        headers: {
                            cookie:
                                (IS_DEVELOPMENT ? "authjs.session-token=" : "__Secure-authjs.session-token=") +
                                (token?.value ?? "")
                        }
                    }
                );

                return { message: "Thêm phim mới thành công!", data: [] };
            } else {
                const movie_id = checkExistMovie.rows[0].id;

                // Lấy danh sách tập phim từ body và CSDL
                const episodesBody: Episode[] = body.episodes;
                const episodesCSDL: Episode[] = (
                    await pool.query("SELECT name, link, slug FROM episodes WHERE movie_id = $1", [movie_id])
                ).rows;

                // Tìm tập mới nhất trong body và CSDL
                const maxEpisodeBody = getMaxEpisode(episodesBody);
                const maxEpisodeCSDL = getMaxEpisode(episodesCSDL);

                if (parseInt(maxEpisodeBody) > parseInt(maxEpisodeCSDL)) {
                    // Lọc ra các tập phim mới cần thêm vào CSDL
                    const newEpisodes = episodesBody.filter(
                        (episode) => parseInt(episode.name) > parseInt(maxEpisodeCSDL)
                    );

                    // Chèn các tập phim mới vào CSDL
                    const queries = newEpisodes.map((episode) => {
                        const episode_id = uuidv4();
                        return {
                            query: "INSERT INTO episodes (episode_id, movie_id, name, link, slug) VALUES ($1, $2, $3, $4, $5)",
                            values: [episode_id, movie_id, episode.name, episode.link, episode.slug]
                        };
                    });

                    const promises = queries.map(({ query, values }) => pool.query(query, values));
                    await Promise.all(promises).catch((error) => {
                        throw new Error(error.message);
                    });
                }

                return { message: "Cập nhật tập phim mới thành công!", data: [] };
            }
        },

        options: {
            request: request,
            checkAuth: "isAdmin",
            required: [
                "slug",
                "genres",
                "countries",
                "episode_current",
                "episode_total",
                "time_per_episode",
                "episodes",
                "movie_name",
                "movie_type_id",
                "image",
                "year",
                "content"
            ]
        }
    });
}

// Hàm lấy tập phim lớn nhất
const getMaxEpisode = (episodes: Episode[]) => {
    return episodes.reduce((max, episode) => {
        if (episode.name.toUpperCase() === "full") {
            return "0";
        }
        return Math.max(parseInt(episode.name), parseInt(max)).toString();
    }, "0");
};
