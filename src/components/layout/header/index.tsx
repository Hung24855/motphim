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
import { signOut } from "firebase/auth";
import { convertSearchParams } from "@/utils/function";
import DropdownMenu from "@/base/libs/DropdownMenu";

function Search({ session }: { session: Session | null }) {
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

    useEffect(() => {
        if (inputRef.current && showSearch) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    const router = useRouter();

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const keyWord = convertSearchParams(search);

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
                        <Link href={"/trang-ca-nhan"} className="w-full hover:text-black">
                            <div className="px-2 py-1 hover:bg-gray-200">Trang cá nhân</div>
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

            <DropdownMenu
                toggleComponent={
                    <button className="relative py-2 duration-200 hover:scale-110">
                        <FaBell size={20} />
                        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-xs">1</span>
                    </button>
                }
                dropdownComponent={
                    <div className="scrollbar-custom max-h-96 w-[80vw] overflow-x-auto rounded text-black md:w-96">
                        <div className="bg-white p-2">
                            <div className="flex justify-between pb-2 text-lg font-semibold">
                                <h3 className="font-bold">Thông báo</h3>
                                <h3 className="text-text_link cursor-pointer hover:underline">Xem tất cả</h3>
                            </div>
                            {/* Không có thông báo */}
                            {/* <div className="mb-4">
                                <div className="flex justify-center">
                                    <svg
                                        width="184"
                                        height="152"
                                        viewBox="0 0 184 152"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-28 w-28"
                                    >
                                        <g fill="none" fill-rule="evenodd">
                                            <g transform="translate(24 31.67)">
                                                <ellipse
                                                    fill-opacity=".8"
                                                    fill="#F5F5F7"
                                                    cx="67.797"
                                                    cy="106.89"
                                                    rx="67.797"
                                                    ry="12.668"
                                                ></ellipse>
                                                <path
                                                    d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                                                    fill="#AEB8C2"
                                                ></path>
                                                <path
                                                    d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                                                    fill="url(#linearGradient-1)"
                                                    transform="translate(13.56)"
                                                ></path>
                                                <path
                                                    d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                                                    fill="#F5F5F7"
                                                ></path>
                                                <path
                                                    d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                                                    fill="#DCE0E6"
                                                ></path>
                                            </g>
                                            <path
                                                d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                                                fill="#DCE0E6"
                                            ></path>
                                            <g transform="translate(149.65 15.383)" fill="#FFF">
                                                <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse>
                                                <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <p className="mt-2 text-center text-gray-400">Chưa có thông báo!</p>
                            </div> */}
                            <div className="space-y-1">
                                <div className="flex h-20 cursor-pointer">
                                    <Image
                                        alt="img"
                                        src={"https://img.ophim.live/uploads/movies/tran-chien-tan-khoc-thumb.jpg"}
                                        width={80}
                                        height={80}
                                        className="aspect-[2/3] w-16 rounded-sm object-cover"
                                    />
                                    <div className="flex-1 pl-2">
                                        <p className="hover:underline hover:underline-offset-2">
                                            Trận chiến tàn khốc đã ra tập mới ❤️
                                        </p>
                                        <small className="text-text_link">7 giờ trước</small>
                                    </div>
                                </div>
                                <div className="flex h-20 cursor-pointer">
                                    <Image
                                        alt="img"
                                        src={"https://img.ophim.live/uploads/movies/lights-out-thumb.jpg"}
                                        width={80}
                                        height={80}
                                        className="aspect-[2/3] w-16 rounded-sm object-cover"
                                    />
                                    <div className="flex-1 pl-2">
                                        <p className="hover:underline hover:underline-offset-2">
                                            Lights Out đã ra tập mới ❤️
                                        </p>
                                        <small className="text-text_link">2 giờ trước</small>
                                    </div>
                                </div>
                                <div className="flex h-20 cursor-pointer">
                                    <Image
                                        alt="img"
                                        src={"https://img.ophim.live/uploads/movies/lieu-chu-ky-thumb.jpg"}
                                        width={80}
                                        height={80}
                                        className="aspect-[2/3] w-16 rounded-sm object-cover"
                                    />
                                    <div className="flex-1 pl-2">
                                        <p className="hover:underline hover:underline-offset-2">
                                            Liễu chu ký đã ra tập mới ❤️
                                        </p>
                                        <small className="text-text_link">3 giờ trước</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                transitionProperty={{
                    transformOrigin: "top",
                    transitionDuration: "150"
                }}
                transitionType="scaleY"
                toggleEvent="click"
                dropdownPositionClassName="right-0"
            />

            {session?.user ? (
                <Popover content={content} trigger="click" className="!px-0">
                    <button>
                        {session?.user?.avatar ? (
                            <Image
                                src={session?.user.avatar}
                                alt="Avatar preview"
                                width={20}
                                height={20}
                                className="h-7 w-7 rounded-full object-cover"
                            />
                        ) : (
                            <FaUser size={20} />
                        )}
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
                        <Link href={"/phong-xem-phim"}>
                            <div className={clsx(isActive("/phong-xem-phim") && "text-blue-500")}>Phòng xem phim</div>
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
