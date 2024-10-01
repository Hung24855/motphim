"use client";
import clsx from "clsx";
import { FaStar } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { motion } from "framer-motion";
import { MouseEvent, useEffect, useRef, useState } from "react";
import MaxWidth from "@/components/layout/max-width";
import { handleSortSlide } from "@/base/utils/function";
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
            <MaxWidth className="relative px-4">
                <div className="absolute bottom-48 h-32 max-w-[32rem] text-white">
                    <div className="h-10 w-[16rem] rounded bg-gray-700"></div>

                    <div className="mt-4 h-20 w-[32rem] rounded bg-gray-700"></div>
                    <div className="mt-4 h-6 w-[14rem] rounded bg-gray-700"></div>

                    <div className="mt-4 h-6 w-32 rounded bg-gray-700"></div>
                </div>
                <div className="absolute bottom-20 right-0 hidden pr-4 md:flex md:justify-end">
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <div
                            key={index}
                            className={clsx(
                                "aspect-square h-40 w-40 cursor-pointer rounded-2xl bg-gray-700", // Đảm bảo tỷ lệ 1:1
                                {
                                    "z-10 translate-x-72 scale-90": index === 0,
                                    "z-20 translate-x-52": index === 1,
                                    "z-30 translate-x-36 scale-125": index === 2,
                                    "z-20 translate-x-20": index === 3,
                                    "z-10 scale-90": index === 4
                                }
                            )}
                        ></div>
                    ))}
                </div>
            </MaxWidth>
        </div>
    );
};

export default function Slide() {
    const [slides, setslides] = useState<slide[]>([]);
    const [oldSlides, setOldSlides] = useState<slide>(slides[2]); //2 ở đây là index miđle của mảng - Thiết lập Background cũ khi chuyển slide . Làm hiệu ứng chuyển nhìn đỡ thô hơn
    const slideRef = useRef<HTMLImageElement>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const { featuredMovies } = MoviesService.get_featured_movies();

    const startAnimate = () => {
        if (slideRef.current) {
            slideRef.current.classList.remove("animate-zoom-in");
            // Trigger reflow to restart the animation - Cần thiết phải có dòng này
            void slideRef.current.offsetWidth;
            slideRef.current.classList.add("animate-zoom-in");
        }
    };

    useEffect(() => {
        if (featuredMovies) {
            const arrSlides: slide[] = featuredMovies.map((item) => ({
                movie_name: item.movie_name,
                image: item.image,
                content: item.content,
                slug: item.slug
            }));
            setslides(arrSlides);
        }
    }, [featuredMovies]);

    const changeSlide = (type: "next" | "prev") => {
        setOldSlides(slides[2]);
        type === "next" ? handleSortSlide(slides, 1) : handleSortSlide(slides, 3);
        setslides((slides) => [...slides]);
        startAnimate();
    };

    const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        const clientX = event.clientX;

        const rect = slideRef.current?.getBoundingClientRect(); //Lấy thông tin kích thước và vị trí của phần tử Ref - sizeAndLocationInfo

        //getBoundingClientRect  return về
        // {
        //     bottom: 200,  // Cạnh dưới của phần tử cách cạnh trên viewport 200px
        //     height: 100,  // Chiều cao của phần tử
        //     left: 8,      // Cạnh trái của phần tử cách cạnh trái viewport 8px
        //     right: 208,   // Cạnh phải của phần tử cách cạnh trái viewport 208px
        //     top: 100,     // Cạnh trên của phần tử cách cạnh trên viewport 100px
        //     width: 200,   // Chiều rộng của phần tử
        //     x: 8,         // Vị trí của cạnh trái (giống left)
        //     y: 100        // Vị trí của cạnh trên (giống top)
        //   }
        if (rect) {
            const xCurrent = ((clientX - rect.left) / rect.width) * 100;
            const deltaX = xCurrent - mousePosition.x; //Khoảng cách chuột từ lúc nhấn chuột đến lúc nhả chuột
            const minDistance = 10;

            if (deltaX > minDistance) {
                //Kéo chuột tử trái sang phải
                changeSlide("next");
            } else if (deltaX < -minDistance) {
                changeSlide("prev");
            }
        }
    };

    //Lấy vị trí của chuột hiện tại chuyển sang % so với kích thước màn hình
    const getBoundingClientRect = (event: MouseEvent<HTMLDivElement>) => {
        if (slideRef.current) {
            const rect = slideRef.current?.getBoundingClientRect();
            if (rect) {
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;

                setMousePosition({ x, y });
            }
        }
    };

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        getBoundingClientRect(event);
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
                style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }}
            />
            <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-r from-[#030A1B] px-2">
                <MaxWidth className="relative">
                    <motion.div
                        className="absolute bottom-48 h-32 max-w-[32rem] text-white"
                        initial={{ opacity: 0, y: 75 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                    >
                        <div className="w-max">
                            <h1 className="line-clamp-1 animate-typing-text overflow-hidden whitespace-nowrap border-r-2 text-4xl font-extrabold md:text-5xl">
                                {slides[2]?.movie_name}
                            </h1>
                        </div>
                        <div className="mt-10 line-clamp-3">{slides[2]?.content}</div>
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
                        className="absolute bottom-20 right-0 hidden h-32 text-white md:flex"
                        initial={{ opacity: 0, y: 75 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                    >
                        {slides.map((item, index) => (
                            <div
                                key={index}
                                className={clsx("aspect-square h-40 w-40 cursor-pointer rounded-2xl border", {
                                    "z-10 translate-x-72 scale-90": index === 0,
                                    "z-20 translate-x-52": index === 1,
                                    "z-30 translate-x-36 scale-125": index === 2,
                                    "z-20 translate-x-20": index === 3,
                                    "z-10 scale-90": index === 4
                                })}
                                style={{ background: `center/cover no-repeat url(${item.image})` }}
                                onClick={(event) => {
                                    //Thay đỏi background thành background cũ
                                    setOldSlides(slides[2]);

                                    handleSortSlide(slides, index);
                                    if (index !== 2) {
                                        setslides((slides) => [...slides]);
                                        startAnimate();
                                    }
                                    getBoundingClientRect(event);
                                }}
                            ></div>
                        ))}
                    </motion.div>
                </MaxWidth>
            </div>
        </div>
    );
}
