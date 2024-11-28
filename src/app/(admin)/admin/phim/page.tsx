import MoviesAdminView from "@/views/admin/movie";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Quản lý phim",
    description: "..."
};
export default function MovieManagement() {
    return <MoviesAdminView />;
}
