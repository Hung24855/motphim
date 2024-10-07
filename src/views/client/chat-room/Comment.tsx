import { handle_add_doc_firebase, handle_update_doc_firebase } from "@/database/firebase.services";
import { authFirebase, dbFirebase } from "@/firebase";
import { arrayUnion, doc, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { RoomType } from "./type";
import { ChatRoomContext } from ".";
import Button from "@/base/libs/button";

export default function Comment() {
    const { selectedRoom, setSelectedRoom } = useContext(ChatRoomContext);
    const [message, setMessage] = useState("");
    const [user] = useAuthState(authFirebase);
    //Gửi tin nhắn
    // const handleSend = async () => {
    //     if (!message) return;
    //     try {
    //         setMessage("");
    //         // 2 người chưa từng chat với nhau
    //         if (Chats?.length === 0) {
    //             await handle_add_doc_firebase({
    //                 docInfo: {
    //                     collectionName: "CHAT_APP",
    //                     docId: Date.now().toString()
    //                 },
    //                 data: {
    //                     member: [
    //                         `${user?.uid ?? ""}${selectedUser?.uid ?? ""}`,
    //                         `${selectedUser?.uid ?? ""}${user?.uid ?? ""}`
    //                     ],
    //                     last_msg: message,
    //                     last_time: serverTimestamp(),
    //                     messages: [
    //                         {
    //                             send_id: user?.uid,
    //                             msg: message,
    //                             time: Date.now()
    //                         }
    //                     ]
    //                 }
    //             });
    //         } else {
    //             // Update thêm tin nhắn nếu 2 người đã từng nhắn tin
    //             const docRef = doc(dbFirebase, "CHAT_APP", Chats[0]?.doc_id);

    //             handle_update_doc_firebase({
    //                 docInfo: {
    //                     collectionName: "CHAT_APP",
    //                     docId: Chats[0]?.doc_id
    //                 },
    //                 data: {
    //                     last_msg: message,
    //                     last_time: serverTimestamp(),
    //                     messages: arrayUnion({
    //                         msg: message,
    //                         send_id: user?.uid,
    //                         time: Date.now()
    //                     })
    //                 }
    //             });
    //         }
    //     } catch (error) {
    //         console.log("error", error);
    //         toast.error("Gửi tin nhắn thất bại! Vui lòng thử lại");
    //     }
    // };
    return (
        <div className="flex h-full flex-col p-2">
            <div className="scrollbar-none flex-1 overflow-y-auto"></div>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            // handleSend();
                        }
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mr-2 flex-1 rounded-lg border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none"
                />
                <Button> Gửi</Button>
            </div>
        </div>
    );
}
