"use client";
import { logout_action } from "@/actions/auth";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbLayoutDashboardFilled, TbList } from "react-icons/tb";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { MdMovie } from "react-icons/md";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";

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
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const ListItem = [
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
            name: "Thể loại",
            icon: <TbList size={24} />,
            path: "/admin/the-loai"
        },
        {
            name: "Quốc gia",
            icon: <GiEarthAsiaOceania size={24} />,
            path: "/admin/quoc-gia"
        },
        {
            name: "Tài khoản",
            icon: <FaUserCircle size={24} />,
            path: "/admin/tai-khoan"
        }
    ];

    const isActive = (path: string) => {
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
            className="relative z-40 border-r-[1px] bg-gray-100"
        >
            <motion.div
                initial="open"
                animate={sidebarOpen ? "open" : "closed"}
                variants={sidebar_variants}
                className="sticky top-0 h-screen"
            >
                <div className="h-full overflow-y-auto overflow-x-hidden px-3">
                    <div className="border-b-2 border-gray-200">
                        <Link href="/" className="flex items-center gap-x-2">
                            <Image src="/logo/Logo-dark.png" alt="logo" width={50} height={50} />
                            {sidebarOpen && <span className="whitespace-nowrap text-lg font-bold">MOTPHIM</span>}
                        </Link>
                    </div>

                    <ul className="space-y-2 pt-4 font-medium">
                        {ListItem.map((item, index) => {
                            return (
                                <li className={clsx("h-12", isActive(item.path) && "rounded bg-gray-300")} key={index}>
                                    <Link
                                        href={item.path}
                                        className={clsx(
                                            "group flex h-full items-center rounded-lg p-2",
                                            isActive(item.path) ? "text-admin_primary" : "text-gray-900",
                                            !sidebarOpen && "justify-center"
                                        )}
                                    >
                                        {item.icon}
                                        <AnimatePresence>
                                            {sidebarOpen && (
                                                <motion.span
                                                    initial="closed"
                                                    animate="open"
                                                    transition={{ duration: 1 }}
                                                    variants={span_variants}
                                                    className="ml-3 block flex-1 whitespace-nowrap text-lg"
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </li>
                            );
                        })}

                        <li onClick={() => logout_action()} className="absolute bottom-5 right-0 w-full px-2">
                            <button
                                className={clsx(
                                    "group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 hover:text-red-500",
                                    !sidebarOpen && "justify-center"
                                )}
                            >
                                <HiOutlineLogout size={24} />
                                <AnimatePresence>
                                    {sidebarOpen && (
                                        <motion.span
                                            initial="closed"
                                            animate="open"
                                            transition={{ duration: 1 }}
                                            variants={span_variants}
                                            className="ml-3 block whitespace-nowrap text-lg text-left"
                                        >
                                            Đăng xuất
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </li>
                    </ul>
                </div>
                <motion.div
                    animate={sidebarOpen ? "open" : "closed"}
                    variants={arrow_variants}
                    className="absolute -right-4 top-2 cursor-pointer rounded-full bg-gray-200 p-2 hover:bg-gray-300"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FaArrowLeft size={20} />
                </motion.div>
            </motion.div>
        </motion.aside>
    );
}
