import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import DB_Connect from "@/database/connect";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ProgessbarProviders from "@/base/libs/progesbar";
import Toast from "@/base/libs/toast";
import NextAuthProvider from "@/base/provider/next-auth";
import { auth } from "@/auth";
import "./globals.css";
import "swiper/css";
import ReactQueryProvder from "@/base/provider/react-query";
import FireBaseProvider from "@/base/provider/fire-base";

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
    const session = await auth();

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo/Logo-light.png" sizes="any" />
            </head>
            <body className={inter.className}>
                <FireBaseProvider>
                    <NextAuthProvider session={session}>
                        <ReactQueryProvder>
                            <ProgessbarProviders>
                                <Header />
                                <main className="min-h-screen bg-bg_primary md:px-0">{children}</main>
                                <Footer />
                            </ProgessbarProviders>
                        </ReactQueryProvder>
                        <Toast />
                    </NextAuthProvider>
                </FireBaseProvider>
            </body>
        </html>
    );
}
