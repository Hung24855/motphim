import ProfileView from "@/views/client/profile";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Trang cá nhân",
    description: "..."
};

export default function ProfilePage() {
    return <ProfileView />;
}
