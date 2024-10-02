import { auth } from "@/auth";
import Favourite from "@/views/client/favourite";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Phim yêu thích",
    description: "..."
};

export default async function FavouritePage() {
    const session = await auth();
    return <Favourite session={session} />;
}
