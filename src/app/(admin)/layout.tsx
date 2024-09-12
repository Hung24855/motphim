import type { Metadata } from "next";
import AdminSideBar from "@/components/admin/side-bar";
import { Fragment } from "react";
import { Nunito } from "next/font/google";
import "./globals.css";
import "swiper/css";
import ReactQueryProvder from "@/base/provider/react-query";
import ProgessbarProviders from "@/base/libs/progesbar";

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
            <html lang="en">
                <head>
                    <link rel="icon" href="/logo/Logo-light.png" sizes="any" />
                </head>
                <body className={inter.className}>
                    <ReactQueryProvder>
                        <ProgessbarProviders>
                            <main className="min-h-screen">
                                <button
                                    type="button"
                                    className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <svg
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>

                                <AdminSideBar />

                                {/*Content  */}
                                <div className="p-4 sm:ml-64">
                                    <div className="rounded-lg">{children}</div>
                                </div>
                            </main>
                        </ProgessbarProviders>
                    </ReactQueryProvder>
                </body>
            </html>
        </Fragment>
    );
}
