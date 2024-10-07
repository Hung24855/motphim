import { authFirebase } from "@/firebase";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RoomType } from "./type";

type Props = { Chats: any; selectedUser: any; selectedRoom: RoomType | null };

export const RoomBody = ({ Chats, selectedUser, selectedRoom }: Props) => {
    const [user] = useAuthState(authFirebase);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(scrollToBottom, [selectedRoom, Chats]);
    return (
        <div ref={chatContainerRef} className="scrollbar-none flex-1 overflow-y-auto p-2 text-white">
            {/* {Chats[0]?.messages.map((mess: any, index: any) => ( */}
            {/* <div key={index} className={`mb-4 flex items-start ${mess.send_id === user?.uid ? "justify-end" : ""}`}> */}
            {/* Avatar */}
            {/* {!(mess.send_id === user?.uid) && (
                        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                            {selectedUser.avatar ? (
                                <Image
                                    src={selectedUser.avatar}
                                    alt="Avatar preview"
                                    width={20}
                                    height={20}
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                            ) : (
                                <span className="font-semibold text-gray-600">{selectedUser.name[0]}</span>
                            )}
                        </div>
                    )}

                    <div
                        className={`max-w-[70%] rounded-lg p-3 ${mess.send_id === user?.uid ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                    >
                        <p className="text-sm">{mess.msg}</p>
                        <p className={`mt-1 text-xs ${mess.send_id === user?.uid ? "text-blue-100" : "text-gray-400"}`}>
                            10:30
                        </p>
                    </div> */}
            {/* </div> */}
            {/* ))} */}
            <iframe
                src="https://vip.opstream17.com/share/a9c154c4658d7fc48fd2be3ef34d9109"
                className="aspect-video w-2/3 overflow-hidden rounded-md bg-stone-900"
                allowFullScreen
                referrerPolicy="no-referrer"
                loading="lazy"
            />
        </div>
    );
};
