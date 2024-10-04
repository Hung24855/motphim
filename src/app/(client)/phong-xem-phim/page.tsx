import { auth } from "@/auth";
import ChatRoomView from "@/views/client/chat-room";

export default async function Page() {
    const session = await auth();
    return <ChatRoomView session={session} />;
}
