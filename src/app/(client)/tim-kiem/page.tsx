import SearchMovieView from "@/views/client/search";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Tìm kiếm phim",
    description: "..."
};
export default function SearchMoviePage() {
    return <SearchMovieView />;
}
