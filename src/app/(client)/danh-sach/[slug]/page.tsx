import ListMovieView from "@/views/client/list-movies";
import { Metadata } from "next";

type Props = {
    params: { slug: "phim-bo" | "phim-le" };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `Danh sách ${params.slug === "phim-bo" ? " phim bộ" : " phim lẻ"}`
    };
}

export default function ListMovie({ params }: { params: { slug: string } }) {
    return <ListMovieView slug={params.slug} />;
}
