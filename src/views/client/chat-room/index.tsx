"use client";
import MaxWidth from "@/components/layout/max-width";
import { Fragment, useState, createContext, useEffect, useContext } from "react";
import Comment from "./Comment";
import SideBar from "./SideBar";
import RoomHeader from "./RoomHeader";
import { RoomBody } from "./RoomBody";
import { ChatRoomContextType, RoomType } from "./type";
import { CONLLECTION } from "@/database/firebase.services";
import { useFirestoreWithDocId } from "@/infrastructure/hooks/useFirestore";
import { toast } from "react-toastify";
import { sessionContext } from "@/base/provider/next-auth";


export const ChatRoomContext = createContext<ChatRoomContextType>({
    selectedRoom: null,
    setSelectedRoom: () => null,
    RoomInfo: undefined
});

export default function ChatRoomView() {
    const { session } = useContext(sessionContext);
    const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

    const { doccument: RoomInfo, isLoading } = useFirestoreWithDocId<Omit<RoomType, "doc_id">>({
        collectionName: CONLLECTION.ROOM_MOVIES,
        docId: selectedRoom?.doc_id ?? ""
    });

    useEffect(() => {
        // Thực hiện đồng bộ xóa phòng
        if (!RoomInfo?.owner && !isLoading) {
            setSelectedRoom(null);
            toast.warning("Chủ phòng đã xóa phòng này!");
        }
    }, [RoomInfo, isLoading]);

  

    return (
        <Fragment>
            <MaxWidth className="z-40 px-2">
                {session ? (
                    <ChatRoomContext.Provider value={{ selectedRoom, setSelectedRoom, RoomInfo }}>
                        <div className="flex h-screen overflow-hidden pt-20">
                            <div
                                className={`flex h-full flex-col md:border-r ${selectedRoom ? "hidden" : "block"} w-full md:w-96`}
                            >
                                <SideBar />
                            </div>

                            {/* Room content */}
                            <div
                                className={`flex h-full w-full flex-col ${selectedRoom ? "block" : "hidden md:block"}`}
                            >
                                {selectedRoom ? (
                                    <Fragment>
                                        <div className="flex h-[50px] items-center border-b p-2">
                                            <RoomHeader />
                                        </div>
                                        <div className="grid flex-1 grid-cols-3">
                                            <div className="col-span-3 h-full overflow-hidden py-2 md:col-span-2">
                                                <RoomBody />
                                            </div>
                                            <div className="col-span-3 h-full md:col-span-1">
                                                <Comment />
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <div className="flex h-full items-center justify-center">
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
                        Vui lòng đăng nhập để sử dụng chức năng này!
                    </div>
                )}
            </MaxWidth>
        </Fragment>
    );
}
