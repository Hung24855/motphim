import React from "react";

import Link from "next/link";
import MaxWidth from "../max-width";
import { FaFacebook, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="z-50 bg-bg_primary">
            <MaxWidth>
                <div className="flex h-20 w-full flex-wrap items-center justify-between border-t-[1px] border-gray-700 px-2 text-sm text-white">
                    <div className="flex flex-wrap gap-1 gap-x-6">
                        <span>
                            © {new Date().getFullYear()}. All Rights Reserved By :{" "}
                            <span className="text-primary"> Nghiêm Hồng</span>
                        </span>
                        <span>Trung tâm trợ giúp</span>
                        <span>Điều khoản</span>
                        <span>Chính sách</span>
                    </div>
                    <div className="flex w-full items-center justify-center gap-x-4 md:w-max">
                        <Link href="https://github.com/Hung24855">
                            <FaGithub size={20} className="cursor-pointer" />
                        </Link>
                        <Link href="https://www.facebook.com/hong.nghiem.2002/?locale=vi_VN">
                            <FaFacebook size={20} className="cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </MaxWidth>
        </div>
    );
}
