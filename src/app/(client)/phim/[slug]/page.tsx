import { auth } from "@/auth";
import MoviePage from "@/views/client/movie";

export default async function Movie({ params }: { params: { slug: string } }) {
    const session = await auth();
    return <MoviePage slug={params.slug} session={session} />;
}
