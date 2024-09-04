import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import DB_Connect from "@/database/connect";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgessbarProviders from "@/base/libs/progesbar";
import ReactQueryProvder from "@/base/libs/react-query";
import { ToastContainer } from "react-toastify";
import "swiper/css";
import { Fragment } from "react";

const inter = Nunito({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
    title: "Xem phim mới chất lượng cao",
    description: "Xem phim mới chất lượng cao"
};

export default async function RootLayout({
    children,
    admin
}: Readonly<{
    children: React.ReactNode;
    admin: React.ReactNode;
}>) {
    DB_Connect();

    const isAdmin = false;

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo/Logo-light.png" sizes="any" />
            </head>
            <body className={inter.className}>
                <ReactQueryProvder>
                    <ProgessbarProviders>
                        {isAdmin ? (
                            <main className="text-black">{admin}</main>
                        ) : (
                            <Fragment>
                                <Header />
                                <main className="min-h-screen bg-[#030A1B] md:px-0">{children}</main>
                                <Footer />
                            </Fragment>
                        )}
                    </ProgessbarProviders>
                </ReactQueryProvder>
                <ToastContainer />
            </body>
        </html>
    );
}
