"use client";
import { logout_action } from "@/actions/auth";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdCategory, MdMovieFilter } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
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

export default function AdminSideBar() {
    const pathName = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <motion.aside
            initial="open"
            animate={sidebarOpen ? "open" : "closed"}
            variants={sidebar_variants}
            className="sticky top-0 z-40 border-r-[1px] h-screen bg-gray-100"
        >
            <div className="overflow-y-auto px-3">
                <div className="border-b-2 border-gray-200">
                    <Link href="/" className="flex items-center gap-x-2">
                        <Image src="/logo/Logo-dark.png" alt="logo" width={50} height={50} />
                        {sidebarOpen && <span className="text-lg font-bold">MOTPHIM</span>}
                    </Link>
                </div>

                <ul className="space-y-2 pt-4 font-medium">
                    <li className="h-12">
                        <Link
                            href="/admin"
                            className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
                        >
                            <BiSolidDashboard size={24} />
                            {sidebarOpen && <span className="ms-3 text-lg">Dashboard</span>}
                        </Link>
                    </li>
                    <li className="h-12">
                        <Link
                            href={"/admin/phim"}
                            className={clsx(
                                "group flex w-full items-center rounded-lg p-2 text-base transition duration-75",
                                {
                                    "text-blue-500": pathName.startsWith("/admin/phim"),
                                    "text-gray-900": !pathName.startsWith("/admin/phim")
                                }
                            )}
                        >
                            <MdMovieFilter size={24} />
                            {sidebarOpen && (
                                <span className="ms-3 flex-1 whitespace-nowrap text-left text-lg rtl:text-right">
                                    Quản lý phim
                                </span>
                            )}
                        </Link>
                    </li>
                    <li className="h-12">
                        <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                            <MdCategory size={24} />
                            {sidebarOpen && <span className="ms-3 flex-1 whitespace-nowrap text-lg">Phân loại</span>}
                        </a>
                    </li>
                    <li className="h-12">
                        <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                            <FaUser size={24} />
                            {sidebarOpen && <span className="ms-3 flex-1 whitespace-nowrap text-lg">Người dùng</span>}
                        </a>
                    </li>

                    <li onClick={() => logout_action()} className="absolute bottom-5 right-0 w-full px-2">
                        <button className="group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 hover:text-red-500">
                            <HiOutlineLogout size={24} />
                            {sidebarOpen && <span className="ms-3 flex-1 whitespace-nowrap text-left">Đăng xuất</span>}
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
        </motion.aside>
    );
}
