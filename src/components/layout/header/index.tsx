"use client";
import { logout_action } from "@/actions/auth";
import DropdownMenu from "@/base/libs/dropdown";
import { convertTime } from "@/base/utils/function";
import { CountriesService } from "@/domain/quoc-gia/service";
import { GenresService } from "@/domain/the-loai/service";
import { NotificationService } from "@/domain/thong-bao/services";
import { sessionContext } from "@/provider/next-auth";
import { convertSearchParams } from "@/utils/function";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import clsx from "clsx";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import SideBarMenu from "../../client/side-bar";
import MaxWidth from "../max-width";

function Search({ session }: { session: Session | null }) {
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
    const { notifications } = NotificationService.getAllNotification({
        enabled: !!session,
        user_id: session?.user?.id ?? ""
    });

    const { ReadNotificationMutation } = NotificationService.useNotification({ user_id: session?.user?.id ?? "" });
    const [notificationCount, setNotificationCount] = useState<number>(0);

    useEffect(() => {
        if (notifications) {
            const count = notifications.filter((notification) => !notification.is_read).length;
            setNotificationCount(count);
        }
    }, [notifications]);

    useEffect(() => {
        if (inputRef.current && showSearch) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const keyWord = convertSearchParams(search);

            //Thay các khoản trắng liên tiếp thành +
            router.push(`/tim-kiem?q=${keyWord}`);
            setSearch("");
        }
    };

    const handleReadNotification = () => {
        if (!session) return;
        ReadNotificationMutation();
    };

    return (
        <div className="flex items-center gap-x-1 md:gap-x-4">
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
                            "max-w-[130px] bg-white/20 md:max-w-[200px]": showSearch,
                            "max-w-0 bg-transparent": !showSearch,
                            "!max-w-[200px]": session?.user && showSearch
                        }
                    )}
                    placeholder="Tên phim..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={onKeyDown}
                    ref={inputRef}
                />

                <div className="px-1" onClick={() => setShowSearch(!showSearch)}>
                    <CiSearch size={24} />
                </div>
            </button>

            <DropdownMenu
                toggleComponent={
                    <button className="relative py-2 duration-200 hover:scale-110" onClick={handleReadNotification}>
                        <FaBell size={24} />
                        {session && notificationCount > 0 && (
                            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-xs">
                                {notificationCount}
                            </span>
                        )}
                    </button>
                }
                onClickDropdownComponent={(_, __, setIsActive) => setIsActive(false)}
                dropdownComponent={
                    <div className="scrollbar-custom max-h-96 w-[80vw] overflow-y-auto rounded text-black md:w-96">
                        <div className="bg-white p-2">
                            <div className="flex justify-between pb-2 text-lg font-semibold">
                                <h3 className="font-bold">Thông báo</h3>
                                <h3
                                    className="cursor-pointer text-text_link hover:underline"
                                    onClick={() => router.push("/thong-bao")}
                                >
                                    Xem tất cả
                                </h3>
                            </div>

                            {!session || !notifications || notifications.length === 0 ? (
                                <div className="mb-4">
                                    <div className="flex justify-center">
                                        <svg
                                            width="184"
                                            height="152"
                                            viewBox="0 0 184 152"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-28 w-28"
                                        >
                                            <g fill="none" fillRule="evenodd">
                                                <g transform="translate(24 31.67)">
                                                    <ellipse
                                                        fillOpacity=".8"
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
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {notifications.map((notification) => (
                                        <div
                                            className="flex h-20 cursor-pointer"
                                            onClick={() => router.push("/phim/" + notification.slug)}
                                            key={notification.created_at}
                                        >
                                            <Image
                                                alt="img"
                                                src={notification.image}
                                                width={80}
                                                height={80}
                                                className="aspect-[2/3] w-16 rounded-sm object-cover"
                                            />
                                            <div className="flex-1 pl-2">
                                                <p className="hover:underline hover:underline-offset-2">
                                                    {notification.title}
                                                </p>
                                                <small className="text-text_link">
                                                    {convertTime(notification.created_at as string)}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                }
                transitionProperty={{
                    transformOrigin: "top",
                    transitionDuration: "150"
                }}
                transitionType="scaleY"
                toggleEvent="click"
                dropdownPositionClassName={session?.user ? "right-0" : "right-[-104px]"}
            />

            {session?.user ? (
                <DropdownMenu
                    toggleComponent={
                        <button className="py-2">
                            {session?.user?.avatar ? (
                                <Image
                                    src={session?.user.avatar}
                                    alt="Avatar preview"
                                    width={24}
                                    height={24}
                                    className="size-7 rounded-full object-cover"
                                />
                            ) : (
                                <FaUser size={24} />
                            )}
                        </button>
                    }
                    dropdownComponent={
                        <Fragment>
                            <div className="w-36 cursor-pointer gap-y-2 rounded bg-white py-1 text-black">
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
                                                    // await Promise.all([signOut(authFirebase), logout_action()]);
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
                    }
                    transitionType="scaleY"
                    onClickDropdownComponent={(_, __, setIsActive) => setIsActive(false)}
                />
            ) : (
                <Fragment>
                    <Link href={"/dang-ky"} className="hidden md:inline">
                        Đăng ký
                    </Link>
                    <Link href={"/dang-nhap"}>
                        <button className="ml-1 rounded bg-white/20 p-2 hover:bg-black/15">Đăng nhập</button>
                    </Link>
                </Fragment>
            )}
        </div>
    );
}

export default function Header() {
    const { session } = useContext(sessionContext);
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

                        {session && (
                            <Fragment>
                                <Link href={"/yeu-thich"}>
                                    <div className={clsx(isActive("/yeu-thich") && "text-blue-500")}>Yêu thích</div>
                                </Link>
                                <Link href={"/phong-xem-phim"}>
                                    <div className={clsx(isActive("/phong-xem-phim") && "text-blue-500")}>
                                        Phòng xem phim
                                    </div>
                                </Link>
                            </Fragment>
                        )}
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
