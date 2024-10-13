import CreateMoviePage from "@/views/admin/movie/create/page";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Thêm phim",
    description: "..."
};
export default function CreateMovie() {
    return <CreateMoviePage />;
}
