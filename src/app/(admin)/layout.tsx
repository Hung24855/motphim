import type { Metadata } from "next";
import AdminSideBar from "@/components/admin/side-bar";
import { Fragment } from "react";
import { Nunito } from "next/font/google";
import "./globals.css";
import "swiper/css";
import ReactQueryProvder from "@/base/provider/react-query";
import ProgessbarProviders from "@/base/libs/progesbar";
import Toast from "@/base/libs/toast";
import AntDesignConfig from "@/base/provider/ant-config";
import Image from "next/image";

const inter = Nunito({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
    title: "Dashboard"
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Fragment>
            <head>
                <link rel="icon" href="/logo/Logo-light.png" sizes="any" />
            </head>
            <html lang="en">
                <body className={inter.className}>
                    <AntDesignConfig>
                        <ReactQueryProvder>
                            <ProgessbarProviders>
                                <main className="flex min-h-screen">
                                    <AdminSideBar />
                                    <div className="flex flex-1 flex-col bg-gray-50 px-6 pb-4">
                                        <div className="flex items-center justify-end gap-x-4 py-1">
                                            <div className="size-10 overflow-hidden rounded-full bg-gray-200">
                                                <Image
                                                    src={"/avatar/avatar.jpg"}
                                                    width={40}
                                                    height={40}
                                                    alt="avatar"
                                                ></Image>
                                            </div>
                                        </div>
                                        <div className="h-full rounded-lg">{children}</div>
                                    </div>
                                </main>
                            </ProgessbarProviders>
                        </ReactQueryProvder>
                    </AntDesignConfig>
                    <Toast />
                </body>
            </html>
        </Fragment>
    );
}
