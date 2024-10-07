"use client";
import MaxWidth from "@/components/layout/max-width";
import { authFirebase } from "@/firebase";
import { ConditionType, useFirestore } from "@/infrastructure/hooks/useFirestore";
import { Session } from "next-auth";
import { Fragment, useState, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SendMessage from "./SendMessage";
import SideBar from "./SideBar";
import RoomHeader from "./RoomHeader";
import { RoomBody } from "./RoomBody";
import { RoomType } from "./type";

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

    return (
        <Fragment>
            <MaxWidth className="min-h-screen px-2">
                {session ? (
                    <div className="flex h-screen overflow-hidden pt-20">
                        {/* Sidebar */}
                        <SideBar
                            setSelectedUser={setSelectedUser}
                            selectedUser={selectedUser}
                            setSelectedRoom={setSelectedRoom}
                            selectedRoom={selectedRoom}
                        />

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
                                    <RoomHeader
                                        setSelectedUser={setSelectedUser}
                                        selectedUser={selectedUser}
                                        selectedRoom={selectedRoom}
                                        setSelectedRoom={setSelectedRoom}
                                    />

                                    <div className="grid grid-cols-3"></div>
                                    <RoomBody selectedUser={selectedUser} Chats={Chats} selectedRoom={selectedRoom} />

                                    <SendMessage selectedUser={selectedUser} Chats={Chats} />
                                </>
                            ) : (
                                <div className="flex flex-1 items-center justify-center">
                                    <p className="text-lg text-gray-400">Chọn một phòng để xem phim cùng mọi người!</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-screen items-center justify-center px-2 pb-10 pt-24 text-3xl text-white">
                        Vui lòng đăng nhập để thực hiện chức năng này!
                    </div>
                )}
            </MaxWidth>
        </Fragment>
    );
}
