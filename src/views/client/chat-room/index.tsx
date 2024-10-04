"use client";
import MaxWidth from "@/components/layout/max-width";
import { handle_add_doc_firebase } from "@/database/firebase.services";
import { authFirebase, dbFirebase } from "@/firebase";
import { ConditionType, useFirestore } from "@/infrastructure/hooks/useFirestore";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Session } from "next-auth";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

export default function ChatRoomView({ session }: { session: Session | null }) {
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [user] = useAuthState(authFirebase);
    //Lắng nghe danh sách user
    const condition: ConditionType = useMemo(() => {
        return {
            fieldName: "uid",
            operator: "!=",
            compareValue: user?.uid
        };
    }, [user]);

    const { doccument: ListUsers } = useFirestore({
        collectionName: "USERS",
        condition: condition
    });
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

    //Gửi tin nhắn
    const handleSend = async () => {
        if (!message) return;
        try {
            // 2 người chưa từng chat với nhau
            if (Chats?.length === 0) {
                await handle_add_doc_firebase({
                    collectionName: "CHAT_APP",
                    data: {
                        member: [
                            `${user?.uid ?? ""}${selectedUser?.uid ?? ""}`,
                            `${selectedUser?.uid ?? ""}${user?.uid ?? ""}`
                        ],
                        last_msg: message,
                        last_time: serverTimestamp(),
                        messages: [
                            {
                                send_id: user?.uid,
                                msg: message,
                                time: Date.now()
                            }
                        ]
                    }
                });
            } else {
                // Update thêm tin nhắn nếu 2 người đã từng nhắn tin
                const docRef = doc(dbFirebase, "CHAT_APP", Chats[0]?.doc_id);
                await updateDoc(docRef, {
                    last_msg: message,
                    last_time: serverTimestamp(),
                    messages: arrayUnion({
                        msg: message,
                        send_id: user?.uid,
                        time: Date.now()
                    })
                });
            }

            setMessage("");
        } catch (error) {
            console.log("error", error);
            toast.error("Gửi tin nhắn thất bại! Vui lòng thử lại");
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(scrollToBottom, [selectedUser, Chats]);

    const sampleUsers = [
        { id: 1, name: "Người dùng 1", lastMessage: "Hẹn gặp lại nhé!", lastMessageTime: "10:30", isOnline: true },
        { id: 2, name: "Người dùng 2", lastMessage: "Cảm ơn bạn rất nhiều.", lastMessageTime: "09:45", isOnline: true },
        { id: 3, name: "Người dùng 1", lastMessage: "Hẹn gặp lại nhé!", lastMessageTime: "10:30", isOnline: true },
        { id: 4, name: "Người dùng 2", lastMessage: "Cảm ơn bạn rất nhiều.", lastMessageTime: "09:45", isOnline: true },
        { id: 5, name: "Người dùng 1", lastMessage: "Hẹn gặp lại nhé!", lastMessageTime: "10:30", isOnline: true },
        { id: 6, name: "Người dùng 2", lastMessage: "Cảm ơn bạn rất nhiều.", lastMessageTime: "09:45", isOnline: true },
        {
            id: 7,
            name: "Người dùng 3",
            lastMessage: "Tôi sẽ gửi email cho bạn.",
            lastMessageTime: "Hôm qua",
            isOnline: false
        },
        {
            id: 8,
            name: "Người dùng 4",
            lastMessage: "Chúc một ngày tốt lành!",
            lastMessageTime: "Thứ 2",
            isOnline: true
        },
        { id: 9, name: "Người dùng 5", lastMessage: "Đồng ý, hẹn gặp lại.", lastMessageTime: "23/5", isOnline: false }
    ];

    const sampleMessages = [
        { id: 1, sender: "User1", content: "Xin chào! Bạn khỏe không?", isSent: false, time: "10:00" }
    ];

    return (
        <Fragment>
            <MaxWidth className="min-h-screen px-2">
                {session ? (
                    <div className="flex h-screen overflow-hidden pt-20">
                        {/* Sidebar */}
                        <div
                            className={`flex h-full flex-col border-r ${selectedUser ? "hidden md:block" : ""} w-full md:w-64`}
                        >
                            {/* Search */}
                            <div className="relative flex p-4">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-2 py-1 text-white placeholder-gray-400 focus:outline-none"
                                />
                            </div>
                            {/* Online users */}
                            <div className="border-b p-4">
                                <h2 className="mb-1 text-lg font-semibold text-white">Online</h2>
                                <div className="scrollbar-none flex space-x-2 overflow-x-auto pb-2">
                                    {sampleUsers
                                        .filter((user) => user.isOnline)
                                        .map((user) => (
                                            <div key={user.id} className="flex-shrink-0">
                                                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                                    <span className="text-lg font-semibold text-gray-600">
                                                        {user.name[0]}
                                                    </span>
                                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {/* Chat list */}
                            <div className="flex flex-col py-2">
                                <h2 className="mb-4 text-lg font-semibold text-white">Danh sách chat</h2>
                                <div className="scrollbar-none flex-1 overflow-y-auto">
                                    {/* {sampleUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="mb-4 flex cursor-pointer items-center rounded p-2 hover:bg-gray-700"
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <div className="relative mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                                                <span className="font-semibold text-gray-600">{user.name[0]}</span>
                                                {user.isOnline && (
                                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-700 bg-green-500"></div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-baseline justify-between">
                                                    <p className="text-sm font-medium text-white">{user.name}</p>
                                                    <span className="text-xs text-gray-400">
                                                    10:30
                                                    </span>
                                                </div>
                                                <p className="truncate text-xs text-gray-400">{user.lastMessage}</p>
                                            </div>
                                        </div>
                                    ))} */}
                                    {ListUsers?.length > 0 &&
                                        ListUsers?.map((user: any) => (
                                            <div
                                                key={user.uid}
                                                className="mb-4 flex cursor-pointer items-center rounded p-2 hover:bg-gray-700"
                                                onClick={() => setSelectedUser(user)}
                                            >
                                                <div className="relative mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                                                    <span className="font-semibold text-gray-600">{user.name[0]}</span>
                                                    {true && (
                                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-700 bg-green-500"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-baseline justify-between">
                                                        <p className="text-sm font-medium text-white">{user.name}</p>
                                                        <span className="text-xs text-gray-400">10:30</span>
                                                    </div>
                                                    <p className="truncate text-xs text-gray-400">
                                                        Tin nhắn cuối cùng!
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Chat content */}
                        <div className={`flex flex-1 flex-col ${selectedUser ? "block" : "hidden md:flex"}`}>
                            {selectedUser ? (
                                <>
                                    {/* Chat header */}
                                    <div className="flex items-center border-b p-4">
                                        <button className="mr-2 md:hidden" onClick={() => setSelectedUser(null)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                        </button>
                                        <div className="flex items-center">
                                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                                                <span className="text-lg font-semibold text-gray-600">
                                                    {selectedUser.name[0]}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{selectedUser.name}</p>
                                                <p className="text-sm text-gray-400">
                                                    {selectedUser.isOnline ? "Online" : "Offline"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Chat messages */}
                                    <div ref={chatContainerRef} className="scrollbar-none flex-1 overflow-y-auto p-4">
                                        {Chats[0]?.messages.map((mess: any, index: any) => (
                                            <div
                                                key={index}
                                                className={`mb-4 flex items-start ${mess.send_id === user?.uid ? "justify-end" : ""}`}
                                            >
                                                {/* Avatar */}
                                                {!(mess.send_id === user?.uid) && (
                                                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                                                        <span className="text-xs font-semibold text-gray-600">
                                                            {" "}
                                                            {selectedUser.name[0]}
                                                        </span>
                                                    </div>
                                                )}

                                                <div
                                                    className={`max-w-[70%] rounded-lg p-3 ${mess.send_id === user?.uid ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                                                >
                                                    <p className="text-sm">{mess.msg}</p>
                                                    <p
                                                        className={`mt-1 text-xs ${mess.send_id === user?.uid ? "text-blue-100" : "text-gray-400"}`}
                                                    >
                                                        10:30
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Input area */}
                                    <div className="border-t p-4">
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
                                            <button
                                                onClick={handleSend}
                                                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                                            >
                                                Gửi
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-1 items-center justify-center">
                                    <p className="text-lg text-gray-400">Chọn một cuộc trò chuyện để bắt đầu</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-screen items-center justify-center px-2 pb-10 pt-24 text-3xl text-white">
                        Vui lòng đăng nhập để thực hiện chức năng này|
                    </div>
                )}
            </MaxWidth>
        </Fragment>
    );
}
