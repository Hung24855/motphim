import CountriesPage from "@/views/countries/page";

export default function Countries({ params }: { params: { slug: string } }) {
    return <CountriesPage slug={params.slug} />;
}
