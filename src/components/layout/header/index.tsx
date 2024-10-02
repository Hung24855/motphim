"use client";
import Image from "next/image";
import MaxWidth from "../max-width";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import SideBarMenu from "../side-bar";
import { GenresService } from "@/domain/the-loai/service";
import { CountriesService } from "@/domain/quoc-gia/service";
import { logout_action } from "@/actions/auth";
import { Session } from "next-auth";
import { Popover, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { LoadingOutlined } from "@ant-design/icons";
import { authFirebase } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Search({ session }: { session: Session | null }) {
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
    // const [user] = useAuthState(authFirebase);


    useEffect(() => {
        if (inputRef.current && showSearch) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    const router = useRouter();

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const keyWord = search.replace(/\s+/g, "-");

            //Thay các khoản trắng liên tiếp thành +
            router.push(`/tim-kiem?q=${keyWord}`);
            setSearch("");
        }
    };

    const content = (
        <Fragment>
            <div className="w-28 cursor-pointer gap-y-2 py-1">
                {session?.user && (
                    <div>
                        <Link href={"/admin"} className="w-full hover:text-black">
                            {session?.user?.role === "admin" && (
                                <div className="px-2 py-1 hover:bg-gray-200">Trang quản trị</div>
                            )}
                        </Link>
                        <Spin spinning={logoutLoading} indicator={<LoadingOutlined spin />}>
                            <div
                                className="px-2 py-1 text-red-500 hover:bg-gray-200"
                                onClick={async () => {
                                    setLogoutLoading(true);
                                    await signOut(authFirebase);
                                    await logout_action();
                                    setLogoutLoading(false);
                                }}
                            >
                                Đăng xuất
                            </div>
                        </Spin>
                    </div>
                )}
            </div>
        </Fragment>
    );
    return (
        <div className="flex items-center gap-x-4">
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
                    onKeyDown={onKeyDown}
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
            {session?.user ? (
                <Popover content={content} trigger="click" className="!px-0">
                    <button>
                        <FaUser size={20} />
                    </button>
                </Popover>
            ) : (
                <Fragment>
                    <Link href={"/dang-ky"}>Đăng ký</Link>
                    <Link href={"/dang-nhap"}>
                        <button className="ml-1 rounded bg-white/20 p-2 hover:bg-black/15">Đăng nhập</button>
                    </Link>
                </Fragment>
            )}

            {/* <button>
                <MdSunny size={22} />
            </button> */}
        </div>
    );
}

export default function Header({ session }: { session: Session | null }) {
    const { data: genres } = GenresService.useGenres();
    const { data: countries } = CountriesService.useCountries();
    const pathName = usePathname();
    const isActive = (path: string) => {
        return pathName.startsWith(path);
    };

    return (
        <nav className="h-18 fixed top-0 z-50 w-full text-white md:mt-2">
            <MaxWidth>
                <div className="flex items-center justify-between bg-transparent p-2 backdrop-blur-md md:rounded-2xl md:p-0 md:pr-4">
                    {/* dieu huong */}
                    <div className="hidden h-full items-center gap-x-6 md:flex">
                        <Link href="/" className="flex cursor-pointer items-center">
                            <Image src="/logo/Logo-light.png" alt="logo" width={65} height={65} /> MOTPHIM
                        </Link>
                        <Link href="/" className="flex cursor-pointer items-center">
                            <div className={clsx(pathName === "/" && "text-blue-500")}>Trang chủ</div>
                        </Link>
                        <Link href={"/danh-sach/phim-le"}>
                            <div className={clsx(isActive("/danh-sach/phim-le") && "text-blue-500")}>Phim lẻ</div>
                        </Link>
                        <Link href={"/danh-sach/phim-bo"}>
                            <div className={clsx(isActive("/danh-sach/phim-bo") && "text-blue-500")}>Phim bộ</div>
                        </Link>

                        <div className="group relative flex cursor-pointer items-center py-3 group-hover:text-primary">
                            <span className={clsx(isActive("/the-loai") && "text-blue-500")}>Thể loại</span>
                            <span>
                                <RiArrowDropDownLine size={25} />
                            </span>
                            {/* Dropdown menu */}
                            {genres && (
                                <div className="dropdown">
                                    {/* Content of the dropdown */}
                                    <div className="grid w-max grid-cols-2 gap-x-5 gap-y-2 text-start md:grid-cols-3 lg:grid-cols-4">
                                        {genres.map((item) => (
                                            <Link href={`/the-loai/${item.slug}`} key={item.id}>
                                                <div className="whitespace-nowrap hover:text-primary" key={item.id}>
                                                    {item.name}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="group relative flex cursor-pointer items-center py-3 group-hover:text-primary">
                            <span className={clsx(isActive("/quoc-gia") && "text-blue-500")}>Quốc gia</span>
                            <span>
                                <RiArrowDropDownLine size={25} />
                            </span>
                            {/* Dropdown menu */}
                            {countries && (
                                <div className="dropdown">
                                    {/* Content of the dropdown */}
                                    <div className="grid w-max grid-cols-2 gap-x-5 gap-y-2 text-start md:grid-cols-3 lg:grid-cols-4">
                                        {countries.map((item) => (
                                            <Link href={`/quoc-gia/${item.slug}`} key={item.id}>
                                                <div className="whitespace-nowrap hover:text-primary" key={item.id}>
                                                    {item.name}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link href={"/yeu-thich"}>
                            <div className={clsx(isActive("/yeu-thich") && "text-blue-500")}>Yêu thích</div>
                        </Link>
                    </div>
                    {/* side bar */}
                    <SideBarMenu genres={genres} countries={countries} />
                    {/* tim kiem */}
                    <Search session={session} />
                </div>
            </MaxWidth>
        </nav>
    );
}
