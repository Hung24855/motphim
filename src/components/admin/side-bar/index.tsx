"use client";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { MdMovie } from "react-icons/md";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { TbLayoutDashboardFilled, TbList } from "react-icons/tb";
import { logout_action } from "@/actions/auth";
import { SideBarList } from "./type";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const sidebar_variants = {
    open: { opacity: 1, x: 0, width: "16rem" },
    closed: { opacity: 1, x: 0, width: "5rem" }
};
const arrow_variants = {
    open: { rotate: 0 },
    closed: { rotate: 180 }
};

const span_variants = {
    open: { width: "100%" },
    closed: { width: 0 }
};
export default function AdminSideBar() {
    const pathName = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

    const toggleSubMenu = (name: string) => {
        if (openMenus.includes(name)) {
            // Nếu menu đã mở, loại bỏ nó khỏi danh sách
            setOpenMenus(openMenus.filter((p) => p !== name));
        } else {
            // Nếu menu chưa mở, thêm nó vào danh sách
            setOpenMenus([...openMenus, name]);
        }
    };

    const ListItem: SideBarList[] = [
        {
            name: "Dashboard",
            icon: <TbLayoutDashboardFilled size={24} />,
            path: "/admin"
        },
        {
            name: "Quản lý phim",
            icon: <MdMovie size={24} />,
            path: "/admin/phim"
        },
        {
            name: "Phân loại",
            icon: <TbList size={24} />,
            subMenu: [
                {
                    name: "Thể loại",
                    path: "/admin/the-loai",
                    icon: <TbList size={24} />
                },
                {
                    name: "Quốc gia",
                    path: "/admin/quoc-gia",
                    icon: <GiEarthAsiaOceania size={24} />
                }
            ]
        },
        {
            name: "Tài khoản",
            icon: <FaUserCircle size={24} />,
            path: "/admin/tai-khoan"
        }
    ];

    const isActive = (path: string) => {
        if (path === "") {
            return false;
        }
        if (path === "/admin") {
            return pathName === path;
        }
        return pathName.startsWith(path);
    };

    return (
        <motion.aside
            initial="open"
            animate={sidebarOpen ? "open" : "closed"}
            variants={sidebar_variants}
            transition={{ duration: 0.25 }}
            className="relative z-40 select-none border-r-[1px] bg-white"
        >
            <motion.div
                initial="open"
                animate={sidebarOpen ? "open" : "closed"}
                variants={sidebar_variants}
                transition={{ duration: 0.25 }}
                className="sticky top-0 h-screen"
            >
                <div className="h-full overflow-y-auto overflow-x-hidden px-1">
                    <div className="border-b-2 border-gray-200">
                        <Link href="/" className={clsx("flex items-center gap-x-2", !sidebarOpen && "justify-center")}>
                            <Image src="/logo/Logo-dark.png" alt="logo" width={50} height={50} />
                            {sidebarOpen && <span className="whitespace-nowrap text-lg font-bold">MOTPHIM</span>}
                        </Link>
                    </div>

                    <ul className="space-y-2 pt-4 font-medium">
                        {ListItem.map((item, index) => {
                            return (
                                <li className={clsx("min-h-12 rounded")} key={index}>
                                    <span
                                        className={clsx(
                                            "group flex h-full cursor-pointer items-center rounded-lg px-1 py-2 hover:bg-gray-200 hover:text-admin_primary",
                                            isActive(item.path ?? "") ||
                                                item.subMenu?.find((subItem) => isActive(subItem.path ?? ""))
                                                ? "bg-gray-200 text-admin_primary"
                                                : "text-gray-900",
                                            !sidebarOpen && "justify-center"
                                        )}
                                        onClick={() => {
                                            // Nếu nenu đang đóng mà mở menu con thì sẽ vỡ giao diện
                                            if (item.subMenu && sidebarOpen) {
                                                toggleSubMenu(item.name);
                                            } else if (item.path) {
                                                router.push(item.path);
                                            }
                                        }}
                                    >
                                        {item.icon}
                                        <AnimatePresence>
                                            {sidebarOpen && (
                                                <motion.span
                                                    initial="closed"
                                                    animate="open"
                                                    transition={{ duration: 0.25 }}
                                                    variants={span_variants}
                                                    className="ml-3 block flex-1 whitespace-nowrap text-lg"
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                            {item.subMenu && sidebarOpen && (
                                                <span className="ml-2">
                                                    {openMenus.includes(item.name) ? (
                                                        <IoIosArrowForward className="rotate-90 duration-200" />
                                                    ) : (
                                                        <IoIosArrowForward className="rotate-0 duration-200" />
                                                    )}
                                                </span>
                                            )}
                                        </AnimatePresence>
                                    </span>
                                    {item.subMenu && (
                                        <ul
                                            className={clsx(
                                                "mt-1 overflow-hidden pl-4 transition-all duration-300",
                                                openMenus.includes(item.name)
                                                    ? "max-h-96 opacity-100"
                                                    : "max-h-0 opacity-0"
                                            )}
                                        >
                                            {item.subMenu.map((subItem, subIndex) => (
                                                <li
                                                    key={subIndex}
                                                    className={clsx(
                                                        "flex cursor-pointer select-none items-center gap-x-2 rounded p-2",
                                                        "hover:bg-gray-200 hover:text-admin_primary",
                                                        isActive(subItem.path ?? "") && "bg-gray-300 text-admin_primary"
                                                    )}
                                                    onClick={() => {
                                                        if (subItem.path) {
                                                            router.push(subItem.path);
                                                        }
                                                    }}
                                                >
                                                    {subItem.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}

                        <li
                            onClick={async () => {
                                setLogoutLoading(true);
                                await logout_action();
                                setLogoutLoading(false);
                            }}
                            className="absolute bottom-5 right-0 w-full px-2"
                        >
                            <Spin spinning={logoutLoading} indicator={<LoadingOutlined spin />}>
                                <button
                                    className={clsx(
                                        "group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 hover:text-red-500",
                                        !sidebarOpen && "justify-center"
                                    )}
                                >
                                    <HiOutlineLogout size={24} />
                                    <AnimatePresence>
                                        {sidebarOpen && (
                                            <motion.span
                                                initial="closed"
                                                animate="open"
                                                transition={{ duration: 0.25 }}
                                                variants={span_variants}
                                                className="ml-3 block whitespace-nowrap text-left text-lg"
                                            >
                                                Đăng xuất
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </Spin>
                        </li>
                    </ul>
                </div>
                <motion.div
                    animate={sidebarOpen ? "open" : "closed"}
                    variants={arrow_variants}
                    className="absolute -right-4 top-2 cursor-pointer rounded-full bg-gray-200 p-2 hover:bg-gray-200"
                    onClick={() => {
                        setSidebarOpen(!sidebarOpen);
                        // Đóng hết các menu con khi đóng side bar
                        setOpenMenus([]);
                    }}
                >
                    <FaArrowLeft size={20} />
                </motion.div>
            </motion.div>
        </motion.aside>
    );
}
