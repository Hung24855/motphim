import ChatRoomView from "@/views/client/chat-room";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Phòng xem phim",
    description: "..."
};
export default async function Page() {
    return <ChatRoomView />;
}
