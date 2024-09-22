"use client";
import clsx from "clsx";
import { FaStar } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { motion } from "framer-motion";
import { MouseEvent, useEffect, useRef, useState } from "react";
import MaxWidth from "@/components/layout/max-width";
import { handleSortSlide } from "@/base/utils/function";

type slide = {
    img: string;
    description: string;
    title: string;
};

const arr = [
    {
        title: "Liễu Chu Ký",
        img: "https://img.ophim.live/uploads/movies/lieu-chu-ky-thumb.jpg",
        description:
            "Liễu Miên Đường bị thương nặng và được Hoài Dương vương Thôi Hành Chu cứu. Khi tỉnh lại, cô mất đi trí nhớ và tưởng Thôi Hành Chu là phu quân của mình."
    },
    {
        title: "Tứ Phương Quán",
        img: "https://img.ophim.live/uploads/movies/tu-phuong-quan-thumb.jpg",
        description:
            '"Tứ Phương Quán" là bộ phim hài cổ trang do Triệu Khải Thần (đạo diễn "Ở Rể") đạo diễn, có sự tham gia của Đàm Kiện Thứ (diễn viên "Lạp Tội Đồ Giám"), Châu Y Nhiên (diễn viên "Đuổi bắt thanh xuân") và Đỗ Thuần (diễn viên "Bát Bách"), Hám Thanh Tử (diễn viên "Chuyến Bay Sinh Tử"). Bộ phim kể về câu chuyện của Nguyên Mạc, A Thuật, Vương Khôn Ngô, và Úy Trì Hoa, bốn chí sĩ với lý tưởng lớn lao, dũng cảm tiến lên vì gia đình, quốc gia và công lý, dù họ chỉ sống trong một thế giới nhỏ bé. Trong thời kỳ An Bình của Đại Ung, chàng trai trẻ Nguyên Mạc người thành Trường Nhạc (Đàm Kiện Thứ đóng) mang theo con dấu Tứ Phương Quán để cấp giấy phép vào thành cho dị tộc, không ngờ sao lại gặp phải A Thuật từ nước Yên Nhạc đến tị nạn.'
    },
    {
        title: "Trường Lạc Khúc",
        img: "https://img.ophim.live/uploads/movies/truong-lac-khuc-thumb.jpg",
        description:
            "Bộ phim kể về câu chuyện của một cặp đôi kẻ thù không đội trời chung vô tình trở thành một cặp nhưng lại yêu nhau trong một loạt các vụ án kỳ lạ và cuối cùng đã chọn chiến đấu cùng nhau."
    },
    {
        title: "Uyển Uyển Như Mộng Tiêu",
        img: "https://img.ophim.live/uploads/movies/uyen-uyen-nhu-mong-tieu-thumb.jpg",
        description:
            "Lăng Tiêu ẩn núp nhiều năm, thoắt cái đã trở thành tân thành chủ quyền thế ngất trời. Để trả thù, hắn cưỡng ép chiếm đoạt con gái của lão thành chủ là Tô Uyển Nhi. Dù hai người có ân oán thù hận ngăn cách, nhưng qua nhiều lần nguy hiểm và bảo vệ, hai người vẫn rơi vào vướng mắc yêu hận, cuối cùng tương lai của cả hai sẽ đi về đâu?"
    },
    {
        title: "Niệm Niệm Nhân Gian Ngọc",
        img: "https://img.ophim.live/uploads/movies/niem-niem-nhan-gian-ngoc-thumb.jpg",
        description:
            "Liên hôn giữa hai gia tộc diệt ma lớn đã khiến Mạc Viêm và Hiên Viên Ngọc trở thành phu thê. Ban đầu, họ chỉ nghĩ rằng mối quan hệ hôn nhân chỉ là tạm thời trong hai năm, nhưng Mạc Viêm lại phát hiện ra rằng, nàng từ lâu đã chiếm lĩnh trái tim anh... Với những mâu thuẫn liên tục nảy sinh và sự thật ẩn sau vẻ bề ngoài, liệu họ có thể thực sự đến với nhau không?"
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
            className="relative h-screen cursor-grab bg-cover bg-clip-padding bg-center bg-no-repeat duration-300"
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
                                {slides[2].title}
                            </h1>
                        </div>
                        <div className="mt-10 line-clamp-3">{slides[2].description}</div>
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
                                Xem phim
                            </button>
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
                    </motion.div>
                </MaxWidth>
            </div>
        </div>
    );
}
