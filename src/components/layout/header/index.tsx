"use client";
import Image from "next/image";
import MaxWidth from "../max-width";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import SideBarMenu from "../side-bar";
import { GenresService } from "@/domain/the-loai/service";
import { CountriesService } from "@/domain/quoc-gia/service";
import { useSession, signIn, signOut } from "next-auth/react";

function Search() {
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    //Auth

    const { data: session } = useSession();
    // console.log(session);

    useEffect(() => {
        if (inputRef.current && showSearch) {
            inputRef.current.focus();
        }
    }, [showSearch]);
    return (
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
                    ref={inputRef}
                />

                <div className="px-1" onClick={() => setShowSearch(!showSearch)}>
                    <CiSearch size={22} />
                </div>
            </button>
            <button className="relative">
                <FaBell size={20} />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="group relative">
                <FaUser size={20} />
                <div className="absolute right-1/2 top-full hidden w-max translate-x-1/2 gap-y-2 rounded bg-white p-2 text-black group-hover:block">
                    {!session ? (
                        <Fragment>
                            <Link href="/dang-ky">
                                <div className="py-1 hover:underline">Đăng ký</div>
                            </Link>
                            <Link href="/dang-nhap">
                                <div className="py-1 hover:underline">Đăng nhập</div>
                            </Link>
                        </Fragment>
                    ) : (
                        <div className="py-1 hover:underline">Đăng xuất</div>
                    )}
                </div>
            </button>
            <button>
                <MdSunny size={22} />
            </button>
        </div>
    );
}

export default function Header() {
    const { data: genres } = GenresService.useGenres();
    const { data: countries } = CountriesService.useCountries();

    return (
        <nav className="h-18 fixed top-0 z-50 w-full text-white md:mt-2">
            <MaxWidth>
                <div className="flex items-center justify-between bg-transparent p-2 backdrop-blur-md md:rounded-2xl md:p-0 md:pr-4">
                    {/* dieu huong */}
                    <div className="hidden h-full items-center gap-x-6 md:flex">
                        <Link href="/" className="flex cursor-pointer items-center">
                            <Image src="/logo/Logo-light.png" alt="logo" width={65} height={65} /> MOTPHIM
                        </Link>
                        <div className="cursor-pointer text-blue-500">Trang chủ</div>

                        <Link href={"/danh-sach/phim-le"}>
                            <div className="cursor-pointer">Phim lẻ</div>
                        </Link>
                        <Link href={"/danh-sach/phim-bo"}>
                            <div className="cursor-pointer">Phim bộ</div>
                        </Link>

                        <div className="group relative flex cursor-pointer items-center py-3 group-hover:text-primary">
                            Thể loại{" "}
                            <span>
                                <RiArrowDropDownLine size={25} />
                            </span>
                            {/* Dropdown menu */}
                            {genres?.data && (
                                <div className="dropdown">
                                    {/* Content of the dropdown */}
                                    <div className="grid w-max grid-cols-2 gap-x-5 gap-y-2 text-start md:grid-cols-3 lg:grid-cols-4">
                                        {genres?.data.map((item) => (
                                            <div className="whitespace-nowrap hover:text-primary" key={item.id}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="group relative flex cursor-pointer items-center py-3 group-hover:text-primary">
                            Quốc gia{" "}
                            <span>
                                <RiArrowDropDownLine size={25} />
                            </span>
                            {/* Dropdown menu */}
                            {countries?.data && (
                                <div className="dropdown">
                                    {/* Content of the dropdown */}
                                    <div className="grid w-max grid-cols-2 gap-x-5 gap-y-2 text-start md:grid-cols-3 lg:grid-cols-4">
                                        {countries?.data.map((item) => (
                                            <div className="whitespace-nowrap hover:text-primary" key={item.id}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link href={"/yeu-thich"}>
                            <div className="cursor-pointer">Yêu thích</div>
                        </Link>
                    </div>
                    {/* side bar */}
                    <SideBarMenu genres={genres?.data} countries={countries?.data} />
                    {/* tim kiem */}
                    <Search />
                </div>
            </MaxWidth>
        </nav>
    );
}
