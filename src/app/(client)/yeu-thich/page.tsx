import { auth } from "@/auth";
import Favourite from "@/views/client/favourite";

export default async function FavouritePage() {
    const session = await auth();
    return <Favourite session={session} />;
}
