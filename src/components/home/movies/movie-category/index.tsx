"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import MovieCard from "@/components/shared/movie-card";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export default function MovieCategory(props: any) {
    const { title, movies, pathAll, slidesPerView = 5 } = props;
    const swiperRef = useRef<SwiperCore>();
    return (
        <div className="mb-10">
            {/* Title */}
            <div className="flex justify-between">
                <h1 className="mb-2 text-2xl">{title}</h1>
                <div className="flex items-center space-x-4">
                    <button className="px-2 py-1 hover:text-primary" onClick={() => swiperRef.current?.slidePrev()}>
                        <GrLinkPrevious />
                    </button>
                    <button className="px-2 py-1 hover:text-primary" onClick={() => swiperRef.current?.slideNext()}>
                        <GrLinkNext />
                    </button>
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
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="mt-6 flex justify-center">
                <button className="rounded border border-primary px-4 py-2">Xem thêm</button>
            </div>
        </div>
    );
}
