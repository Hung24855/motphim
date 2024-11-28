import { auth } from "@/auth";
import MoviePage from "@/views/client/movie";

type Props = {
    params: { slug: string };
    searchParams: { tap: string };
};

export default async function Movie(props: Props) {
    const session = await auth();
    return <MoviePage slug={props.params.slug} session={session} searchParams={props.searchParams} />;
}
