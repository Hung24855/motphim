import { useContext, useEffect, useRef, useState } from "react";
import { ChatRoomContext } from ".";
import Button from "@/base/libs/button";
import Image from "next/image";
import { sessionContext } from "@/base/provider/next-auth";
import { CONLLECTION, handle_update_doc_firebase } from "@/database/firebase.services";
import { arrayUnion } from "firebase/firestore";

export default function Comment() {
    const { selectedRoom, RoomInfo } = useContext(ChatRoomContext);
    const [message, setMessage] = useState<string>("");
    const { session } = useContext(sessionContext);

    const handleSend = async () => {
        if (!message) return;

        setMessage("");
        handle_update_doc_firebase({
            docInfo: {
                collectionName: CONLLECTION.ROOM_MOVIES,
                docId: selectedRoom?.doc_id as string
            },
            data: {
                messages: arrayUnion({
                    avatar: session?.user.avatar ?? "",
                    username: session?.user.username as string,
                    msg: message,
                    send_id: session?.user.id as string,
                    time: Date.now()
                })
            }
        });
    };

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(scrollToBottom, [RoomInfo?.messages]);

    return (
        <div className="z-40 flex h-full flex-col p-2">
            <div
                ref={chatContainerRef}
                className="scrollbar-none h-[calc(100vh-188px)] overflow-hidden overflow-y-auto"
            >
                <div>
                    {RoomInfo?.messages?.map((mess, index: any) => (
                        <div
                            key={index}
                            className={`mb-4 flex items-start ${mess.send_id === session?.user?.id ? "justify-end" : ""}`}
                        >
                            {/* Avatar */}
                            {!(mess.send_id === session?.user?.id) && (
                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                                    {mess.avatar ? (
                                        <Image
                                            src={mess.avatar}
                                            alt="Avatar preview"
                                            width={20}
                                            height={20}
                                            className="h-8 w-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="font-semibold text-gray-600">{mess.username[0]}</span>
                                    )}
                                </div>
                            )}

                            <div
                                className={`max-w-[70%] rounded-lg p-3 ${mess.send_id === session?.user?.id ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                            >
                                <p className="text-sm">{mess.msg}</p>
                                <p
                                    className={`mt-1 text-xs ${mess.send_id === session?.user?.id ? "text-blue-100" : "text-gray-400"}`}
                                >
                                    10:30
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSend();
                        }
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mr-2 flex-1 rounded-lg border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:outline-none"
                />
                <Button onClick={handleSend}> Gửi</Button>
            </div>
        </div>
    );
}
