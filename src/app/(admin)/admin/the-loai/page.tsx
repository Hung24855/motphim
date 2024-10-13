import GenresAdminView from "@/views/admin/genres";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Quản lý thể loại",
    description: "..."
};

export default function GenresManegement() {
    return <GenresAdminView />;
}
