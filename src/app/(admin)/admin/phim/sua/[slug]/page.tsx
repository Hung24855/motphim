import EditMoviePage from "@/views/admin/movie/edit/page";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Cập nhật phim",
    description: "..."
};
export default function EditMovie({ params }: { params: { slug: string } }) {
    return <EditMoviePage slug={params.slug} />;
}
