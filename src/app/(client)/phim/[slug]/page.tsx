import MoviePage from "@/views/client/movie";

export default function Movie({ params }: { params: { slug: string } }) {
    return <MoviePage slug={params.slug} />;
}
