"use client";
import { useRef } from "react";
import SwiperCore from "swiper";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import MovieCard from "@/components/shared/movie-card";
import { MoviesService } from "@/domain/phim/services";
import { ListMovieSkeleton } from "@/components/shared/movie-card-skeleton";

type props = {
    title: string;
    pathAll?: string;
    slidesPerView?: number;
    slug: string;
};

export default function MovieCategory(props: props) {
    const { title, pathAll, slidesPerView = 5, slug } = props;
    const swiperRef = useRef<SwiperCore>();

    const { data: movies } = MoviesService.get_movies_by_genre({
        slug
    });

    if (!movies) return <ListMovieSkeleton number={5} containerClassName="!pt-0" showTitle />;

    return (
        <div className="mb-5">
            {/* Title */}
            <div className="flex justify-between">
                <h1 className="mb-2 text-2xl">{title}</h1>
                <div className="flex items-center space-x-4">
                    <motion.button
                        className="px-2 py-1 hover:text-primary"
                        onClick={() => swiperRef.current?.slidePrev()}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 1.2 }}
                    >
                        <GrLinkPrevious />
                    </motion.button>
                    <motion.button
                        className="px-2 py-1 hover:text-primary"
                        onClick={() => swiperRef.current?.slideNext()}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 1.2 }}
                    >
                        <GrLinkNext />
                    </motion.button>
                </div>
            </div>
            <Swiper
                loop={true}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{
                    0: {
                        spaceBetween: 4,
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    640: {
                        spaceBetween: 6,
                        slidesPerView: 3,
                        slidesPerGroup: 3
                    },
                    768: {
                        spaceBetween: 8,
                        slidesPerView: 4,
                        slidesPerGroup: 4
                    },
                    1024: {
                        spaceBetween: 10,
                        slidesPerView: 5,
                        slidesPerGroup: 5
                    }
                }}
            >
                {movies.data.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="mt-6 flex justify-center">
                <button className="rounded border border-primary px-4 py-2">Xem thêm</button>
            </div>
        </div>
    );
}
