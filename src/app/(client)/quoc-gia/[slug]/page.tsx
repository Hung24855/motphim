import CountriesPage from "@/views/client/countries/page";


export default function Countries({ params }: { params: { slug: string } }) {
    return <CountriesPage slug={params.slug} />;
}
