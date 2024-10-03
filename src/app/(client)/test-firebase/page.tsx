"use client";
import MaxWidth from "@/components/layout/max-width";
import { Fragment, useState, useEffect, useRef } from "react";

export default function Page() {
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        console.log("Sending message:", message);
        setMessage("");
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(scrollToBottom, [selectedUser]);

    const sampleUsers = [
        { id: 1, name: "Người dùng 1", lastMessage: "Hẹn gặp lại nhé!", lastMessageTime: "10:30", isOnline: true },
        { id: 2, name: "Người dùng 2", lastMessage: "Cảm ơn bạn rất nhiều.", lastMessageTime: "09:45", isOnline: true },
        {
            id: 3,
            name: "Người dùng 3",
            lastMessage: "Tôi sẽ gửi email cho bạn.",
            lastMessageTime: "Hôm qua",
            isOnline: false
        },
        {
            id: 4,
            name: "Người dùng 4",
            lastMessage: "Chúc một ngày tốt lành!",
            lastMessageTime: "Thứ 2",
            isOnline: true
        },
        { id: 5, name: "Người dùng 5", lastMessage: "Đồng ý, hẹn gặp lại.", lastMessageTime: "23/5", isOnline: false }
    ];

    const sampleMessages = [
        { id: 1, sender: "User1", content: "Xin chào! Bạn khỏe không?", isSent: false, time: "10:00" },
        { id: 2, sender: "You", content: "Chào bạn! Tôi khỏe, còn bạn thì sao?", isSent: true, time: "10:02" },
        { id: 3, sender: "User1", content: "Tôi cũng khỏe, cảm ơn bạn đã hỏi thăm.", isSent: false, time: "10:05" },
        { id: 4, sender: "You", content: "Hôm nay thời tiết đẹp nhỉ?", isSent: true, time: "10:07" },
        { id: 5, sender: "User1", content: "Đúng vậy, rất thích hợp để đi dạo.", isSent: false, time: "10:10" },
        { id: 6, sender: "You", content: "Bạn có kế hoạch gì cho cuối tuần không?", isSent: true, time: "10:12" },
        {
            id: 7,
            sender: "User1",
            content: "Tôi dự định đi picnic với gia đình. Còn bạn?",
            isSent: false,
            time: "10:15"
        },
        { id: 8, sender: "You", content: "Tuyệt vời! Tôi sẽ ở nhà đọc sách và xem phim.", isSent: true, time: "10:18" },
        {
            id: 9,
            sender: "User1",
            content: "Nghe cũng thú vị đấy. Bạn đang đọc cuốn sách nào?",
            isSent: false,
            time: "10:20"
        },
        {
            id: 10,
            sender: "You",
            content: "Tôi đang đọc 'Đắc Nhân Tâm' của Dale Carnegie.",
            isSent: true,
            time: "10:23"
        },
        {
            id: 11,
            sender: "User1",
            content: "Ồ, đó là một cuốn sách rất hay! Tôi đã đọc nó năm ngoái.",
            isSent: false,
            time: "10:25"
        },
        {
            id: 12,
            sender: "You",
            content: "Thật sao? Bạn có thể chia sẻ ấn tượng của mình về cuốn sách không?",
            isSent: true,
            time: "10:28"
        },
        {
            id: 13,
            sender: "User1",
            content: "Chắc chắn rồi! Cuốn sách đã giúp tôi cải thiện kỹ năng giao tiếp rất nhiều.",
            isSent: false,
            time: "10:30"
        },
        {
            id: 14,
            sender: "You",
            content: "Nghe có vẻ rất hữu ích. Tôi đang rất mong chờ để đọc tiếp.",
            isSent: true,
            time: "10:32"
        },
        {
            id: 15,
            sender: "User1",
            content: "Chúc bạn đọc sách vui vẻ! Hãy chia sẻ cảm nhận của bạn khi đọc xong nhé.",
            isSent: false,
            time: "10:35"
        },
        { id: 16, sender: "You", content: "Chắc chắn rồi! Cảm ơn bạn nhiều.", isSent: true, time: "10:37" },
        {
            id: 17,
            sender: "User1",
            content: "Không có gì. Bạn có kế hoạch gì cho buổi tối không?",
            isSent: false,
            time: "10:40"
        },
        {
            id: 18,
            sender: "You",
            content: "Tôi dự định nấu một bữa tối ngon và xem một bộ phim. Còn bạn?",
            isSent: true,
            time: "10:42"
        },
        {
            id: 19,
            sender: "User1",
            content: "Nghe tuyệt đấy! Tôi sẽ gặp gỡ vài người bạn để ăn tối.",
            isSent: false,
            time: "10:45"
        },
        { id: 20, sender: "You", content: "Chúc bạn có một buổi tối vui vẻ nhé!", isSent: true, time: "10:47" },
        { id: 21, sender: "User1", content: "Cảm ơn bạn! Chúc bạn cũng vậy.", isSent: false, time: "10:50" },
        { id: 22, sender: "You", content: "Cảm ơn! Hẹn gặp lại bạn sau.", isSent: true, time: "10:52" },
        { id: 23, sender: "User1", content: "Hẹn gặp lại! Tạm biệt.", isSent: false, time: "10:55" }
    ];

    return (
        <Fragment>
            <MaxWidth className="min-h-screen px-2">
                <div className="flex h-screen pt-20">
                    {/* Sidebar */}
                    <div className={`border-r ${selectedUser ? "hidden md:block" : ""} w-full md:w-64`}>
                        <div className="scrollbar-none h-full overflow-y-auto">
                            {/* Online users */}
                            <div className="border-b p-4">
                                <h2 className="mb-4 text-lg font-semibold text-white">Online</h2>
                                <div className="flex space-x-2 overflow-x-auto pb-2">
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
                            <div className="p-4">
                                <h2 className="mb-4 text-lg font-semibold text-white">Danh sách chat</h2>
                                {sampleUsers.map((user) => (
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
                                                <span className="text-xs text-gray-400">{user.lastMessageTime}</span>
                                            </div>
                                            <p className="truncate text-xs text-gray-400">{user.lastMessage}</p>
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
                                    {sampleMessages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`mb-4 flex items-start ${msg.isSent ? "justify-end" : ""}`}
                                        >
                                            {/* Avatar */}
                                            {!msg.isSent && (
                                                
                                                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                                                    <span className="text-xs font-semibold text-gray-600">
                                                        {msg.sender[0]}
                                                    </span>
                                                </div>
                                            )}

                                            <div
                                                className={`max-w-[70%] rounded-lg p-3 ${msg.isSent ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
                                            >
                                                <p className="text-sm">{msg.content}</p>
                                                <p
                                                    className={`mt-1 text-xs ${msg.isSent ? "text-blue-100" : "text-gray-400"}`}
                                                >
                                                    {msg.time}
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
            </MaxWidth>
        </Fragment>
    );
}
