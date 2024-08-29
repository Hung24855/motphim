"use client";
import Image from "next/image";
import MaxWidth from "../max-width";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useState } from "react";
import clsx from "clsx";

export default function Header() {
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    return (
        <nav className="h-18 fixed top-0 z-50 w-full py-2 text-white">
            <MaxWidth>
                <div className="flex justify-between rounded-2xl bg-white/15 pr-4 backdrop-blur-sm">
                    <div className="flex h-full items-center gap-x-6">
                        <div className="flex cursor-pointer items-center">
                            <Image src="/logo/Logo-light.png" alt="logo" width={65} height={65} /> MOTPHIM
                        </div>
                        <div className="cursor-pointer text-blue-500">Trang chủ</div>
                        <div className="cursor-pointer">Phim lẻ</div>
                        <div className="cursor-pointer">Phim bộ</div>
                        <div className="cursor-pointer">Thể loại</div>
                        <div className="cursor-pointer">Quốc gia</div>
                    </div>
                    <div className="flex items-center gap-x-6">
                        <button
                            className={clsx("duration-400 flex items-center rounded-md transition-all", {
                                "bg-white/20": showSearch
                            })}
                        >
                            <input
                                type="text"
                                className={clsx(
                                    "rounded-bl-md rounded-tl-md px-2 py-1 placeholder-white/65 outline-none transition-all duration-300",
                                    {
                                        "max-w-[200px] bg-white/20": showSearch,
                                        "max-w-0 bg-transparent": !showSearch
                                    }
                                )}
                                placeholder="Tên phim..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <div className="px-1" onClick={() => setShowSearch(!showSearch)}>
                                <CiSearch size={22} />
                            </div>
                        </button>
                        <button className="relative">
                            <FaBell size={20} />
                            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                        </button>
                        <button>
                            <FaUser size={20} />
                        </button>
                        <button>
                            <MdSunny size={22} />
                        </button>
                    </div>
                </div>
            </MaxWidth>
        </nav>
    );
}
