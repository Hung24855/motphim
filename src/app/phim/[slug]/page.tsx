import MoviePage from "@/views/movie";

export default function Movie({ params }: { params: { slug: string } }) {
    return <MoviePage slug={params.slug} />;
}
