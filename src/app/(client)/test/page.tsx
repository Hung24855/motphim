"use client";
import MaxWidth from "@/components/layout/max-width";
import { motion } from "framer-motion";
import { useState } from "react";

export default function TestModal() {
    const [images, setImages] = useState<any>([
        "https://img.ophim.live/uploads/movies/vong-vay-ca-map-thumb.jpg",
        "https://img.ophim.live/uploads/movies/liep-bang-thumb.jpg",
        "https://img.ophim.live/uploads/movies/tu-phuong-quan-thumb.jpg",
        "https://img.ophim.live/uploads/movies/uyen-uyen-nhu-mong-tieu-thumb.jpg",
        "https://img.ophim.live/uploads/movies/hon-nhan-khong-thua-thiet-thumb.jpg"
    ]);
    //Test deploy

    const handleSortSlide = (arr: any[], index: number) => {
        const newArr = [...arr];
        const middle = Math.floor(newArr.length / 2); // Index trung tâm
        const space = Math.abs(index - middle); // Khoảng cách từ index đến trung tâm

        if (index > middle) {
            const a = newArr.splice(0, space);
            newArr.push(...a);
        }
        if (index < middle) {
            const a = newArr.splice(-space);
            newArr.unshift(...a);
        }

        return newArr;
    };

    return (
        <MaxWidth className="flex min-h-screen flex-col items-center justify-center pt-20 text-white">
            <div className="relative h-52 w-[624px]">
                {images.map((image: any, index: number) => {
                    const isCenter = index === 2;
                    return (
                        <motion.img
                            src={image}
                            alt="img"
                            key={image}
                            className="size-52 cursor-pointer rounded-2xl"
                            style={{
                                position: "absolute",
                                top: 0,
                                objectFit: "cover"
                            }}
                            animate={{
                                zIndex: isCenter ? 3 : [1, 3].includes(index) ? 2 : 1,
                                scale: isCenter ? 1 : [1, 3].includes(index) ? 0.85 : 0.7,
                                left: isCenter ? "calc(100% * 2/6)" : `calc(100% * ${index}/6)`
                            }}
                            transition={{ duration: 0.4 }}
                            onClick={() => {
                                const newImages = handleSortSlide(images, index);
                                setImages(newImages);
                            }}
                        />
                    );
                })}
            </div>
        </MaxWidth>
    );
}
