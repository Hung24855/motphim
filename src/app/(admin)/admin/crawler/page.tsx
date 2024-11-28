import CrawlerView from "@/views/admin/crawler";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Crawler",
    description: "..."
};
export default function CrawlerPage() {
    return <CrawlerView />;
}
