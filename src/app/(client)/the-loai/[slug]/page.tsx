import GenresPage from "@/views/client/genres";


export default function Genres({ params }: { params: { slug: string } }) {
    return <GenresPage slug={params.slug} />;
}
