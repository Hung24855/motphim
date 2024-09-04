"use client";
import { handleSortSlide } from "@/base/utils/function";
import MaxWidth from "@/components/layout/max-width";
import clsx from "clsx";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";

type slide = {
    img: string;
    description: string;
    title: string;
};

const arr = [
    {
        title: "The Witcher One",
        img: "https://wallpapersmug.com/download/1600x900/cce793/movie-poster-of-john-wick-3.jpg",
        description:
            "Để cứu Paris khỏi cuộc tắm máu quốc tế, nhà khoa học đau buồn nọ buộc phải đối mặt với quá khứ bi thảm của mình khi một con cá mập khổng lồ xuất hiện ở sông Seine."
    },
    {
        title: "The Witcher Two",
        img: "https://wallpapersmug.com/download/1600x900/b41742/thanos-and-the-black-order.jpg",
        description:
            "Reiyan Asura, nếu đó là tên thật của anh ấy, thức tỉnh trong khoảng không, bị ràng buộc bởi xiềng xích. Anh ta không nhớ mình là ai hay làm thế nào anh ta đến được thế giới màu trắng này. Anh ấy không hề biết rằng anh ấy đã cùng hàng triệu người khác tham gia vào một trò chơi phức tạp, nơi chỉ có kẻ mạnh nhất mới thắng thế."
    },
    {
        title: "The Witcher Three",
        img: "https://images.hdqwalls.com/download/poster-avengers-endgame-ni-1600x900.jpg",
        description:
            "Thiếu Lâm Tự Truyền Kỳ 3: Thiếu Lâm Tự Đại Mạc Anh Hào - The Legend of Shaolin Kung Fu 3 tiếp tục là câu chuyện kể về các cao tăng thiếu lâm, những môn võ bị thất truyền"
    },
    {
        title: "The Witcher Four",
        img: "https://wallpapersmug.com/download/1600x900/e5a909/star-wars-the-last-jedi-2017-movie-poster-red.jpg",
        description:
            "Những sự kiện kỳ lạ quấy nhiễu một cựu cảnh sát sau khi anh nhận nuôi một cô bé khăng khăng rằng mình là con gái anh. Giờ anh bắt đầu tìm hiểu xem cô bé là ai và đang muốn gì."
    },
    {
        title: "The Witcher Five",
        img: "https://wallpapersmug.com/download/1600x900/4bf01b/new-2023-movie-john-wick-4-poster.jpg",
        description:
            "Sau khi nhà vua qua đời ở Goguryeo, một cuộc chiến khốc liệt nổ ra giữa các bộ tộc. Nữ hoàng Woo, người ngay lập tức trở thành mục tiêu của các hoàng tử và năm bộ tộc tranh giành ngai vàng, đấu tranh để trao vương miện cho một vị vua mới trong vòng 24 giờ. "
    }
];
export default function Slide() {
    const [slides, setslides] = useState<slide[]>(arr);
    const [oldSlides, setOldSlides] = useState<slide>(slides[2]); //2 ở đây là index miđle của mảng - Thiết lập Background cũ khi chuyển slide . Làm hiệu ứng chuyển nhìn đỡ thô hơn
    const slideRef = useRef<HTMLImageElement>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

    useEffect(() => {
        if (slideRef.current) {
            //Xóa class tồn tại trước đó
            slideRef.current.classList.remove("scale-up");
            // Trigger reflow to restart the animation - Cần thiết phải có dòng này
            void slideRef.current.offsetWidth;
            //Set vị trí bắt đầu scale (Ở đây là vị trí chuột)
            slideRef.current.style.transformOrigin = `${mousePosition.x}% ${mousePosition.y}%`;
            slideRef.current.classList.add("scale-up");
        }
    }, [slides]);

    const changeSlide = (type: "next" | "prev") => {
        setOldSlides(slides[2]);
        type === "next" ? handleSortSlide(slides, 1) : handleSortSlide(slides, 3);
        setslides((slides) => [...slides]);
    };

    const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
        const clientX = event.clientX;
        const rect = slideRef.current?.getBoundingClientRect(); //Lấy thông tin kích thước và vị trí của phần tử Ref - sizeAndLocationInfo

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

    return (
        <div
            className="relative h-screen cursor-grab bg-cover bg-no-repeat bg-clip-padding  bg-center "
            style={{ backgroundImage: `url(${oldSlides.img})` }}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
        >
            <img
                src={slides[2].img}
                alt="img"
                className="absolute inset-0 z-[1] h-full w-full object-cover"
                ref={slideRef}
            />
            <div className="absolute z-10 inset-0 h-full w-full bg-gradient-to-r from-[#030A1B] px-2">
                <MaxWidth className="relative">
                    <div className="absolute bottom-48 h-32 max-w-[32rem] text-white">
                        <div className="w-max">
                            <h1 className="line-clamp-1 animate-typing-text overflow-hidden whitespace-nowrap border-r-2 md:text-5xl text-4xl font-extrabold">
                                {slides[2].title}
                            </h1>
                        </div>
                        <div className="mt-10 line-clamp-3">{slides[0].description}</div>
                        <div className="mt-2 flex gap-x-2 text-primary">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <div className="mt-4">
                            <button className="flex items-center gap-x-1 rounded-lg bg-blue-500 px-3 py-1 text-white">
                                <IoPlay />
                                Watch Movie
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-20 right-0 hidden h-32 text-white md:flex">
                        {slides.map((item, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    "h-40 w-40 cursor-pointer rounded-2xl border border-blue-300 bg-red-400",
                                    {
                                        "z-10 translate-x-28 scale-90": index === 0,
                                        "z-20 translate-x-12": index === 1,
                                        "z-30 scale-125": index === 2,
                                        "z-20 -translate-x-12": index === 3,
                                        "z-10 -translate-x-28 scale-90": index === 4
                                    }
                                )}
                                style={{ background: `center/cover no-repeat url(${item.img})` }}
                                onClick={(event) => {
                                    //Thay đỏi background thành background cũ
                                    setOldSlides(slides[2]);

                                    handleSortSlide(slides, index);
                                    if (index !== 2) {
                                        setslides((slides) => [...slides]);
                                    }

                                    getBoundingClientRect(event);
                                }}
                            ></div>
                        ))}
                    </div>
                </MaxWidth>
            </div>
        </div>
    );
}
