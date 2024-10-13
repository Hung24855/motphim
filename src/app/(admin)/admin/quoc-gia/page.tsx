import CountriesAdminView from "@/views/admin/countries";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Quản lý quốc gia",
    description: "..."
};
export default function CountriesManagement() {
    return <CountriesAdminView />;
}
