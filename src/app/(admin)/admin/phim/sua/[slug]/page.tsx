import EditMoviePage from "@/views/admin/movie/edit/page";

export default function EditMovie({ params }: { params: { slug: string } }) {
    return <EditMoviePage slug={params.slug} />;
}
