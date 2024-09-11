"use client";
import MovieCategory from "@/components/home/movies/movie-category";
import MaxWidth from "@/components/layout/max-width";
import { MoviesService } from "@/domain/phim/services";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import Script from "next/script";
import { Fragment, useEffect, useState } from "react";

type Props = {
    slug: string;
};

const MovieDetailSkeleton = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-900 pt-28 md:pt-0">
            <MaxWidth className="w-full max-w-7xl">
                <div className="rounded-lg p-6 text-white shadow-lg">
                    {/* Movie Poster Skeleton */}
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex w-full justify-center lg:w-1/3">
                            <div className="mb-6 h-80 w-2/3 animate-pulse rounded-lg bg-gray-700 md:w-full lg:mb-0"></div>
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
    const [episode, setEpisode] = useState<string>("1");
    const { data: response } = MoviesService.get_movie(props.slug);
    const movie = response?.data[0];

    // console.log(response);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!movie) return <MovieDetailSkeleton />;

    return (
        <Fragment>
            <div
                style={{ backgroundImage: `url(${movie?.image})` }}
                className="relative min-h-screen w-full bg-cover bg-center lg:max-h-[800px]"
            >
                {/* Thông tin phim */}
                <MaxWidth className="text-white">
                    <div className="inset-0 flex items-center bg-black/70 px-4 pb-10 pt-28 lg:absolute">
                        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 md:flex-row">
                            <img src={movie.image} alt="img" className="aspect-[2/3] w-full max-w-[300px] rounded" />
                            <div className="w-full">
                                <h2 className="text-4xl font-extrabold lg:text-5xl">{movie.movie_name}</h2>
                                <span className="font-bold text-primary">The Legend of Shaolin Kung Fu 4</span>
                                <div className="my-4 flex flex-col gap-5 font-medium lg:flex-row lg:items-center">
                                    <div className="flex items-center gap-2 text-xs font-bold">
                                        {/* <span className="bg-white px-2.5 py-1 text-black">{`${movie?.episode_current} / ${movie?.episode_total} Tập`}</span> */}
                                        <span className="border-2 border-white px-2.5 py-0.5">HD</span>
                                    </div>
                                    <ul className="flex flex-wrap items-center gap-x-2">
                                        <li className="hover:text-primary">{movie.genre} </li>
                                    </ul>
                                </div>
                                <div className="flex items-center gap-5">
                                    <span className="flex items-center gap-2">
                                        <Icon icon="bx:calendar" className="text-primary" height={16} />
                                        {movie.year}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Icon icon="akar-icons:clock" className="text-primary" height={16} />
                                        {movie?.time_per_episode ?? "Đang cập nhật"}
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
                                            <li className="hover:text-primary">Trung Quốc</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="movie-content max-h-80 overflow-auto text-sm">{movie.content}</div>
                                <div className="mt-8 flex w-max items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 px-4 py-4 md:gap-5 md:px-7">
                                    <button className="flex flex-col items-center justify-center gap-1 text-sm hover:text-primary">
                                        <Icon icon="solar:share-bold" height={18} />
                                        Share
                                    </button>
                                    <span className="h-12 w-0.5 bg-white/10 md:block" />
                                    <div className="flex items-center gap-3 text-sm font-bold">
                                        <a href="#viđeo">
                                            <button className="rounded-full bg-primary px-8 py-3 text-black disabled:bg-zinc-600 disabled:text-white disabled:hover:bg-zinc-600">
                                                Xem
                                            </button>
                                        </a>
                                        <button className="flex items-center gap-2 rounded-full border-2 border-primary bg-black/70 px-5 py-2.5 duration-300 hover:bg-primary hover:text-black">
                                            <Icon
                                                // icon={isFavourite ? "ph:heart-break-fill" : "solar:heart-linear"}
                                                icon="solar:heart-linear"
                                                height={20}
                                            />
                                            Yêu thích
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
                                        onClick={() => setEpisode(item.name)}
                                    >
                                        {item.name}
                                    </button>
                                );
                            })}
                            {/* {[1, 2, 3, 4, 5].map((item) => {
                                return (
                                    <button
                                        className={clsx(
                                            "rounded bg-[#191919] px-2 py-2 text-center hover:bg-primary hover:text-black md:px-10"
                                        )}
                                        key={item}
                                    >
                                        {item}
                                    </button>
                                );
                            })} */}
                        </div>
                    </div>

                    {/* Xem video */}
                    <div className="mt-20 px-2 md:px-0" id="viđeo">
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
                        <MovieCategory title={"Phim " + movie.genre} slug={movie.genre_slug} />
                    </div>
                </MaxWidth>
            </div>
        </Fragment>
    );
}
