"use client";
import MaxWidth from "@/components/layout/max-width";
import { authFirebase } from "@/firebase";
import { ConditionType, useFirestore } from "@/infrastructure/hooks/useFirestore";
import { Session } from "next-auth";
import { Fragment, useState, useMemo, createContext, Dispatch, SetStateAction } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Comment from "./Comment";
import SideBar from "./SideBar";
import RoomHeader from "./RoomHeader";
import { RoomBody } from "./RoomBody";
import { RoomType } from "./type";

export type ChatRoomContextType = {
    selectedRoom: RoomType | null;
    setSelectedRoom: Dispatch<RoomType | null>;
};

export const ChatRoomContext = createContext<ChatRoomContextType>({
    selectedRoom: null,
    setSelectedRoom: () => null
});

export default function ChatRoomView({ session }: { session: Session | null }) {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
    const [user] = useAuthState(authFirebase);

    //Lắng nghe đoạn chat của người dùng đang select
    const convention: ConditionType = useMemo(() => {
        return {
            fieldName: "member",
            operator: "array-contains",
            compareValue: `${user?.uid ?? ""}${selectedUser?.uid ?? ""}`
        };
    }, [user, selectedUser]);

    const { doccument: Chats } = useFirestore({
        collectionName: "CHAT_APP",
        condition: convention
    });
    console.log("selectedRoom", selectedRoom);

    return (
        <Fragment>
            <MaxWidth className="min-h-screen px-2">
                {session ? (
                    <ChatRoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
                        <div className="flex h-screen overflow-hidden pt-20">
                            {/* Sidebar */}
                            <SideBar />

                            {/* Chat content */}
                            {/* <div className={`flex flex-1 flex-col ${selectedUser ? "block" : "hidden md:flex"}`}>
                            {selectedUser ? (
                                <>
                                    <ChatHeader setSelectedUser={setSelectedUser} selectedUser={selectedUser} />

                                    <ChatMessage selectedUser={selectedUser} Chats={Chats} />

                                    <SendMessage selectedUser={selectedUser} Chats={Chats} />
                                </>
                            ) : (
                                <div className="flex flex-1 items-center justify-center">
                                    <p className="text-lg text-gray-400">Chọn một cuộc trò chuyện để bắt đầu</p>
                                </div>
                            )}
                        </div> */}

                            {/* Room content */}
                            <div className={`flex flex-1 flex-col ${selectedRoom ? "block" : "hidden md:flex"}`}>
                                {selectedRoom ? (
                                    <>
                                        <RoomHeader />

                                        <div className="grid flex-1 grid-cols-3">
                                            <div className="col-span-3 h-full md:col-span-2">
                                                <RoomBody />
                                            </div>
                                            <div className="col-span-3 h-full md:col-span-1">
                                                <Comment />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-1 items-center justify-center">
                                        <p className="text-lg text-gray-400">
                                            Chọn một phòng để xem phim cùng mọi người!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ChatRoomContext.Provider>
                ) : (
                    <div className="flex h-screen items-center justify-center px-2 pb-10 pt-24 text-3xl text-white">
                        Vui lòng đăng nhập để thực hiện chức năng này!
                    </div>
                )}
            </MaxWidth>
        </Fragment>
    );
}
