"use client";
import MovieCategory from "@/components/client/movies/movie-category";
import MaxWidth from "@/components/layout/max-width";
import { MovieForCardDTO } from "@/domain/phim/dto";
import { MoviesService } from "@/domain/phim/services";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Session } from "next-auth";
import { useRouter } from "next-nprogress-bar";
import Script from "next/script";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    slug: string;
    session: Session | null;
    searchParams: { tap: string };
};

const MovieDetailSkeleton = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 pt-28 md:pt-0">
            <MaxWidth className="w-full max-w-7xl">
                <div className="rounded-lg p-6 text-white shadow-lg">
                    {/* Movie Poster Skeleton */}
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex w-full lg:w-1/4">
                            <div className="mb-6 h-96 w-full animate-pulse rounded-lg bg-gray-700 lg:mb-0"></div>
                        </div>

                        {/* Movie Information Skeleton */}
                        <div className="flex flex-col justify-between lg:w-2/3 lg:pl-6">
                            <div>
                                <div className="mb-4 h-8 w-1/2 animate-pulse rounded bg-gray-700"></div>

                                {/* Smaller skeleton text lines */}
                                <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-700"></div>
                                <div className="mb-2 h-4 w-1/4 animate-pulse rounded bg-gray-700"></div>
                                <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-gray-700"></div>
                                <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-gray-700"></div>
                                <div className="mb-4 h-4 w-1/4 animate-pulse rounded bg-gray-700"></div>
                                <div className="mb-6 h-24 w-full animate-pulse rounded bg-gray-700"></div>
                            </div>

                            {/* Button Skeleton */}
                            <div className="mt-4 flex justify-start">
                                <div className="mr-4 h-10 w-20 animate-pulse rounded bg-gray-700"></div>
                                <div className="h-10 w-32 animate-pulse rounded bg-gray-700"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
};

export default function MoviePage(props: Props) {
    const queryClient = useQueryClient();
    const videoRef = useRef<HTMLDivElement>(null);
    const [episode, setEpisode] = useState<string>(() => props.searchParams?.tap ?? "1");
    const { data: response } = MoviesService.get_movie(props.slug);
    const { mutateUnFavoriteMovie, mutateFavoriteMovie } = MoviesService.use_favorite_action();
    const { checkFavoriteMovie } = MoviesService.check_favorite_movie({
        movie_id: response ? response[0]?.id : "",
        user_id: props.session?.user.id ?? ""
    });
    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!response) return <MovieDetailSkeleton />;
 
    if (response.length === 0)
        return (
            <div className="flex h-screen items-center justify-center px-2 pb-10 pt-24 text-3xl text-white">
                Phim không tồn tại ^_^
            </div>
        );

    const movie = response[0];

    // Chức năng chia sẻ
    const handleShare = async () => {
        if (navigator.share && typeof window !== "undefined" && movie) {
            try {
                await navigator.share({
                    title: "Chia sẻ",
                    text: movie.movie_name,
                    url: window.location.href
                });
            } catch (error) {
                console.error("Chia sẻ nội dung thất bại!", error);
            }
        } else {
            alert("Web Share API is not supported in your browser.");
        }
    };
    // Chức năng yêu thích
    const handleFavoriteMovie = (text: "favorite" | "unfavorite") => {
        const user_id = props.session?.user.id;
        if (user_id) {
            if (text === "favorite") {
                mutateFavoriteMovie(
                    { user_id: user_id, movie: movie as MovieForCardDTO },
                    {
                        onSuccess(data) {
                            queryClient.setQueryData([QUERY_KEY.GET_CHECK_FAVORITE_MOVIE, movie.id], data);
                        },
                        onError(e) {}
                    }
                );
            } else {
                mutateUnFavoriteMovie(
                    { user_id, movie_id: movie.id },
                    {
                        onSuccess(data) {
                            queryClient.setQueryData([QUERY_KEY.GET_CHECK_FAVORITE_MOVIE, movie.id], data);
                        },
                        onError(e) {}
                    }
                );
            }
        } else {
            toast.warning("Bạn cần đăng nhập để yêu thích phim!");
        }
    };

    return (
        <Fragment>
            <div
                style={{ backgroundImage: `url(${movie.image})` }}
                className="relative min-h-screen w-full bg-cover bg-center lg:max-h-[800px]"
            >
                {/* Thông tin phim */}
                <MaxWidth className="text-white">
                    <div className="inset-0 flex items-center bg-black/70 px-4 pb-10 pt-28 lg:absolute">
                        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 md:flex-row">
                            <img src={movie.image} alt="img" className="aspect-[2/3] w-full max-w-[300px] rounded" />
                            <div className="w-full">
                                <h2 className="text-4xl font-extrabold lg:text-5xl">{movie.movie_name}</h2>
                                <span className="font-bold text-primary">Phim vietsub độc quyền</span>
                                <div className="my-4 flex flex-col gap-5 font-medium lg:flex-row lg:items-center">
                                    <div className="flex items-center gap-2 text-xs font-bold">
                                        {/* <span className="bg-white px-2.5 py-1 text-black">{`${movie?.episode_current} / ${movie?.episode_total} Tập`}</span> */}
                                        <span className="border-2 border-white px-2.5 py-0.5">HD</span>
                                    </div>
                                    <ul className="flex flex-wrap items-center gap-x-2">
                                        <li className="hover:text-primary">
                                            {movie.genres.map((genre) => genre.name).join(", ")}{" "}
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex items-center gap-5">
                                    <span className="flex items-center gap-2">
                                        <Icon icon="bx:calendar" className="text-primary" height={16} />
                                        {movie.year}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Icon icon="akar-icons:clock" className="text-primary" height={16} />
                                        {movie.time_per_episode ?? "Đang cập nhật"}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Icon icon="tdesign:subtitle" className="text-primary" height={16} />
                                        {movie.lang}
                                    </span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <span className="flex items-center gap-2">
                                        <Icon icon="jam:movie" className="text-primary" height={16} />
                                        {movie.episode_current} / {movie.episode_total} Tập
                                    </span>
                                    <div className="my-2 flex items-center gap-2">
                                        <Icon icon="grommet-icons:language" className="text-primary" height={16} />
                                        <ul className="flex items-center gap-2">
                                            <li className="hover:text-primary">
                                                {movie.countries.map((country) => country.name).join(", ")}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="movie-content max-h-80 overflow-auto text-sm">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: movie.content ?? ""
                                        }}
                                    />
                                </div>
                                <div className="mt-8 flex w-max items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-4 py-4 md:gap-5 md:px-7">
                                    <button
                                        className="flex flex-col items-center justify-center gap-1 text-sm hover:text-primary"
                                        onClick={handleShare}
                                    >
                                        <Icon icon="solar:share-bold" height={18} />
                                        Share
                                    </button>
                                    <span className="h-12 w-0.5 bg-white/10 md:block" />
                                    <div className="flex items-center gap-3 text-sm font-bold">
                                        <a href="#video" className="scroll-smooth">
                                            <button className="rounded-full bg-primary px-8 py-3 text-black disabled:bg-zinc-600 disabled:text-white disabled:hover:bg-zinc-600">
                                                Xem
                                            </button>
                                        </a>
                                        <button
                                            className={clsx(
                                                "flex w-[132px] items-center gap-2 rounded-full border-2 border-primary bg-black/70 px-5 py-2.5 duration-300",
                                                checkFavoriteMovie?.is_favorites
                                                    ? "bg-red-500 text-white"
                                                    : "hover:bg-primary hover:text-black"
                                            )}
                                            onClick={() => {
                                                const option = checkFavoriteMovie?.is_favorites
                                                    ? "unfavorite"
                                                    : "favorite";
                                                handleFavoriteMovie(option);
                                            }}
                                        >
                                            <Icon
                                                icon={
                                                    checkFavoriteMovie?.is_favorites
                                                        ? "ph:heart-break-fill"
                                                        : "solar:heart-linear"
                                                }
                                                height={20}
                                            />
                                            {checkFavoriteMovie?.is_favorites ? "Bỏ thích" : "Yêu thích"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidth>
            </div>

            <div className="min-h-screen bg-[#0D0D0D] pt-10">
                <MaxWidth className="text-white">
                    {/* Tập phim */}
                    <div className="px-2 md:px-0">
                        <p>Vietsub #1</p>
                        <div className="mt-2 grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-12">
                            {movie.episodes?.map((item) => {
                                return (
                                    <button
                                        className={clsx(
                                            "rounded bg-[#191919] px-2 py-2 text-center hover:bg-primary hover:text-black md:px-10",
                                            {
                                                "bg-primary text-black": item.name === episode
                                            }
                                        )}
                                        key={item.episode_id}
                                        onClick={() => {
                                            setEpisode(item.name);
                                            router.push(`?tap=${item.name}`, { scroll: false });
                                        }}
                                    >
                                        {item.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Xem video */}
                    <div className="mt-20 px-2 md:px-0" id="video" ref={videoRef}>
                        <iframe
                            src={movie.episodes.find((item) => item.name === episode)?.link}
                            className="aspect-video w-full overflow-hidden rounded-md bg-stone-900"
                            allowFullScreen
                            referrerPolicy="no-referrer"
                            loading="lazy"
                        />
                    </div>

                    {/* Tích hợp comment */}
                    <div id="disqus_thread" className="mx-auto my-16 max-w-5xl px-5"></div>
                    <Script id="my-script">
                        {`(function() { // DON'T EDIT BELOW THIS LINE
                            var d = document, s = d.createElement('script');
                            s.src = 'https://hong-movie.disqus.com/embed.js';
                            s.setAttribute('data-timestamp', +new Date());
                            (d.head || d.body).appendChild(s);
                            })();`}
                    </Script>

                    <div className="px-2 py-2">
                        <MovieCategory title={"Phim " + movie.genres[0].name} slug={movie.genres[0].slug} />
                    </div>
                </MaxWidth>
            </div>
        </Fragment>
    );
}
