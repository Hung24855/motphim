"use client";
import { FaStar } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { motion } from "framer-motion";
import { MouseEvent, useEffect, useRef, useState } from "react";
import MaxWidth from "@/components/layout/max-width";
import { MoviesService } from "@/domain/phim/services";
import Link from "next/link";

type slide = {
    image: string;
    content: string;
    movie_name: string;
    slug: string;
};

const SlideSkeleton = () => {
    return (
        <div className="relative h-screen w-full animate-pulse">
            <MaxWidth className="relative px-2">
                <div className="absolute bottom-20 max-w-[32rem]">
                    <div className="h-10 w-[16rem] rounded bg-gray-700"></div>
                    <div className="mt-4 h-20 w-[21rem] rounded bg-gray-700 md:w-[32rem]"></div>
                    <div className="mt-4 h-6 w-[14rem] rounded bg-gray-700"></div>
                    <div className="mt-4 h-6 w-32 rounded bg-gray-700"></div>
                </div>
                <div className="absolute bottom-20 right-0 hidden h-52 w-[528px] md:block">
                    {[1, 2, 3, 4, 5].map((item, index) => {
                        const isCenter = index === 2;
                        return (
                            <div
                                key={item}
                                className="size-52 cursor-pointer rounded-2xl bg-gray-700"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    objectFit: "cover",
                                    zIndex: isCenter ? 3 : [1, 3].includes(index) ? 2 : 1,
                                    scale: isCenter ? 1 : [1, 3].includes(index) ? 0.85 : 0.7,
                                    left: isCenter ? "calc(100% * 2/6)" : `calc(100% * ${index}/6)`
                                }}
                            ></div>
                        );
                    })}
                </div>
            </MaxWidth>
        </div>
    );
};

export default function Slide() {
    const [slides, setSlides] = useState<slide[]>([]);
    const [oldSlides, setOldSlides] = useState<slide | null>(null);
    const slideRef = useRef<HTMLImageElement>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const { featuredMovies } = MoviesService.get_featured_movies();

    useEffect(() => {
        if (featuredMovies) {
            const arrSlides = featuredMovies.map(({ movie_name, image, content, slug }) => ({
                movie_name,
                image,
                content,
                slug
            }));
            setSlides(arrSlides);
            setOldSlides(arrSlides[2]); // Initialize oldSlides
        }
    }, [featuredMovies]);

    const startAnimate = () => {
        if (slideRef.current) {
            slideRef.current.classList.remove("animate-zoom-in");
            void slideRef.current.offsetWidth; // Trigger reflow
            slideRef.current.classList.add("animate-zoom-in");
        }
    };

    const changeSlide = (type: "next" | "prev") => {
        setOldSlides(slides[2]);
        const newSlides = handleSortSlide(slides, type === "next" ? 1 : 3);
        setSlides(newSlides);
        startAnimate();
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        getMousePosition(event);
    };
    const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        const rect = slideRef.current?.getBoundingClientRect();
        if (rect) {
            const deltaX = ((event.clientX - rect.left) / rect.width) * 100 - mousePosition.x;
            if (Math.abs(deltaX) > 10) {
                changeSlide(deltaX > 0 ? "next" : "prev");
            }
        }
    };

    const getMousePosition = (event: MouseEvent<HTMLDivElement>) => {
        const rect = slideRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePosition({
                x: ((event.clientX - rect.left) / rect.width) * 100,
                y: ((event.clientY - rect.top) / rect.height) * 100
            });
        }
    };

    const handleSortSlide = (arr: slide[], index: number) => {
        const newArr = [...arr];
        const middle = Math.floor(newArr.length / 2);
        const space = Math.abs(index - middle);
        if (index > middle) {
            newArr.push(...newArr.splice(0, space));
        } else if (index < middle) {
            newArr.unshift(...newArr.splice(-space));
        }
        return newArr;
    };

    if (slides.length === 0) return <SlideSkeleton />;

    return (
        <div
            className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${oldSlides?.image})` }}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
        >
            <img
                src={slides[2]?.image}
                alt="img"
                className="absolute inset-0 z-[1] h-full w-full object-cover"
                ref={slideRef}
                style={{ transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` }}
            />
            <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-r from-[#030A1B] px-2">
                <MaxWidth className="relative">
                    <motion.div
                        className="absolute bottom-20 max-w-[32rem] text-white"
                        initial={{ opacity: 0, y: 75 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                    >
                        <div className="w-max">
                            <h1 className="line-clamp-1 animate-typing-text overflow-hidden whitespace-nowrap border-r-2 text-4xl font-extrabold md:text-5xl">
                                {slides[2]?.movie_name}
                            </h1>
                        </div>

                        <div className="mt-10 line-clamp-3">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: slides[2]?.content ?? ""
                                }}
                            />
                        </div>
                        <div className="mt-2 flex gap-x-2 text-primary">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <div className="mt-4">
                            <Link href={`/phim/${slides[2]?.slug}`}>
                                <motion.button
                                    className="flex items-center gap-x-1 rounded-lg bg-blue-500 px-3 py-1 text-white"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <IoPlay />
                                    Xem phim
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        className="absolute bottom-20 right-0 hidden h-52 w-[528px] md:block"
                        initial={{ opacity: 0, y: 75 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                    >
                        {slides.map((item, index) => (
                            <motion.img
                                src={item.image}
                                alt="img"
                                key={item.image}
                                className="size-52 cursor-pointer rounded-2xl"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    objectFit: "cover"
                                }}
                                animate={{
                                    zIndex: index === 2 ? 3 : [1, 3].includes(index) ? 2 : 1,
                                    scale: index === 2 ? 1 : [1, 3].includes(index) ? 0.85 : 0.7,
                                    left: `calc(100% * ${index}/6)`
                                }}
                                transition={{ duration: 0.4 }}
                                onClick={(event) => {
                                    setOldSlides(slides[2]);

                                    if (index !== 2) {
                                        const newSlides = handleSortSlide(slides, index);
                                        setSlides(newSlides);
                                        startAnimate();
                                    }
                                    getMousePosition(event);
                                }}
                            />
                        ))}
                    </motion.div>
                </MaxWidth>
            </div>
        </div>
    );
}
