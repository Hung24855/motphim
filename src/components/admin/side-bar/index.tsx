import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdCategory, MdMovieFilter } from "react-icons/md";
import { RiEarthFill } from "react-icons/ri";

export default function AdminSideBar() {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0">
            <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                            <BiSolidDashboard size={20} />
                            <span className="ms-3">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <Link
                            href={"/admin/phim"}
                            className="group flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75"
                        >
                            <MdMovieFilter size={20} />
                            <span className="ms-3 flex-1 whitespace-nowrap text-left rtl:text-right">Quản lý phim</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                            <MdCategory size={20} />
                            <span className="ms-3 flex-1 whitespace-nowrap">Thể loại</span>
                        </a>
                    </li>   
                    <li>
                        <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                            <RiEarthFill size={20} />
                            <span className="ms-3 flex-1 whitespace-nowrap">Quốc gia</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                            <FaUser size={20} />
                            <span className="ms-3 flex-1 whitespace-nowrap">Người dùng</span>
                        </a>
                    </li>

                    <li>
                        <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                            <IoIosLogOut size={20} />
                            <span className="ms-3 flex-1 whitespace-nowrap">Sign In</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100">
                            <svg
                                className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                            </svg>
                            <span className="ms-3 flex-1 whitespace-nowrap">Sign Up</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
