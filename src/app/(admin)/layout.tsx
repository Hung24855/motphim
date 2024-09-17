import type { Metadata } from "next";
import AdminSideBar from "@/components/admin/side-bar";
import { Fragment } from "react";
import { Nunito } from "next/font/google";
import "./globals.css";
import "swiper/css";
import ReactQueryProvder from "@/base/provider/react-query";
import ProgessbarProviders from "@/base/libs/progesbar";
import Toast from "@/base/libs/toast";

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
                            <main className="flex min-h-screen">
                                <AdminSideBar />
                                <div className="flex-1 bg-gray-50 p-4">
                                    <div className="rounded-lg">{children}</div>
                                </div>
                            </main>
                        </ProgessbarProviders>
                    </ReactQueryProvder>
                    <Toast />
                </body>
            </html>
        </Fragment>
    );
}
