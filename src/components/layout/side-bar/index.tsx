"use client";

import { GenresDTO } from "@/domain/the-loai/dto";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowForward, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

type SideBarProps = {
    genres?: GenresDTO[];
    countries?: any[];
};

export default function SideBarMenu({ countries, genres }: SideBarProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [openSubMenuGenre, setopenSubMenuGenreGenre] = useState<boolean>(false);
    const [openSubMenuCountry, setopenSubMenuCountry] = useState<boolean>(false);
    return (
        <div className="md:hidden">
            <motion.div onClick={() => setOpen(!open)} whileTap={{ scale: 0.8 }}>
                <GiHamburgerMenu size={35} className={`mr-4 cursor-pointer md:hidden ${open && "hidden"}`} />
            </motion.div>

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 z-10 h-screen w-[55%] bg-black/60 p-2 backdrop-blur-lg transition-transform duration-500 ease-in-out ${
                    !open ? "-translate-x-full" : "translate-x-0"
                }`}
            >
                <div className="text-center font-bold">MOT PHIM</div>
                <div className="mt-2 h-full text-left">
                    <ul>
                        <Link href="/">
                            <li
                                className="flex cursor-pointer items-center rounded py-3 pl-1 font-semibold hover:bg-slate-100/60"
                                onClick={() => {
                                    setOpen(!open);
                                }}
                            >
                                Trang chủ
                            </li>
                        </Link>
                        <Link href="/danh-sach/phim-bo">
                            <li
                                className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60"
                                onClick={() => {
                                    setOpen(!open);
                                }}
                            >
                                Phim bộ
                            </li>
                        </Link>
                        <Link href="/danh-sach/phim-le">
                            <li
                                className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60"
                                onClick={() => {
                                    setOpen(!open);
                                }}
                            >
                                Phim lẻ
                            </li>
                        </Link>
                        <li>
                            <div
                                className="flex h-full w-full cursor-pointer justify-between rounded py-3 pl-1 hover:bg-slate-100/60"
                                onClick={() => setopenSubMenuGenreGenre(!openSubMenuGenre)}
                            >
                                <span>Thể loại</span>
                                <IoIosArrowForward
                                    size={20}
                                    className={`transition-transform duration-500 ${openSubMenuGenre && "rotate-90"}`}
                                />
                            </div>
                            {/* Sub menu */}
                            <ul
                                className={`${openSubMenuGenre ? "overflow-y-auto" : "overflow-y-hidden"} scrollbar-custom duration-500 ease-in-out ${
                                    openSubMenuGenre ? "max-h-52" : "max-h-0"
                                }`}
                            >
                                {genres?.map((item) => (
                                    <Link href={`/the-loai/${item.slug}`} key={item.id}>
                                        <li
                                            className="cursor-pointer rounded py-2 pl-4 hover:bg-slate-100/60"
                                            onClick={() => {
                                                setOpen(!open);
                                            }}
                                        >
                                            <span className="mr-1">&bull;</span>
                                            {item.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <div
                                className="flex h-full w-full cursor-pointer justify-between rounded py-3 pl-1 hover:bg-slate-100/60"
                                onClick={() => setopenSubMenuCountry(!openSubMenuCountry)}
                            >
                                <span>Quốc gia</span>
                                <IoIosArrowForward
                                    size={20}
                                    className={`transition-transform duration-500 ${openSubMenuCountry && "rotate-90"}`}
                                />
                            </div>
                            {/* Sub menu */}
                            <ul
                                className={`${openSubMenuCountry ? "overflow-y-auto" : "overflow-y-hidden"} scrollbar-custom duration-500 ease-in-out ${
                                    openSubMenuCountry ? "max-h-52" : "max-h-0"
                                }`}
                            >
                                {countries?.map((item) => (
                                    <Link href={`/quoc-gia/${item.slug}`} key={item.id}>
                                        <li
                                            className="cursor-pointer rounded py-2 pl-4 hover:bg-slate-100/60"
                                            onClick={() => {
                                                setOpen(!open);
                                            }}
                                        >
                                            <span className="mr-1">&bull;</span>
                                            {item.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </li>
                        <Link href={"/yeu-thich"}>
                            <li
                                className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60"
                                onClick={() => {
                                    setOpen(!open);
                                }}
                            >
                                Yêu thích
                            </li>
                        </Link>
                    </ul>
                </div>
                <motion.span
                    whileTap={{ scale: 0 }}
                    className="absolute right-1 top-1 cursor-pointer"
                    onClick={() => setOpen(false)}
                >
                    <IoMdClose size={35} />
                </motion.span>
            </div>

            {/* Overlay */}
            {open && (
                <div className="fixed inset-0 h-screen bg-black/50 md:hidden" onClick={() => setOpen(false)}></div>
            )}
        </div>
    );
}
