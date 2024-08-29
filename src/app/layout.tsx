import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import DB_Connect from "@/database/connect";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgessbarProviders from "@/base/libs/progesbar";
import ReactQueryProvder from "@/base/libs/react-query";
import { ToastContainer } from "react-toastify";

const inter = Nunito({ subsets: ["latin"], preload: true });

export const metadata: Metadata = {
    title: "Xem phim mới chất lượng cao",
    description: "Xem phim mới chất lượng cao"
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    DB_Connect();

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo/Logo-light.png" sizes="any" />
            </head>
            <body className={inter.className}>
                <ReactQueryProvder>
                    <ProgessbarProviders>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </ProgessbarProviders>
                </ReactQueryProvder>
                <ToastContainer />
            </body>
        </html>
    );
}
