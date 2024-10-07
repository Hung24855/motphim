import Image from "next/image";
import { Dispatch } from "react";
import { RoomType } from "./type";
import { Avatar, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { authFirebase } from "@/firebase";
import Button from "@/base/libs/button";

export default function ChatHeader({
    selectedUser,
    setSelectedUser,
    selectedRoom,
    setSelectedRoom
}: {
    setSelectedUser: Dispatch<any>;
    selectedUser: any;
    selectedRoom: RoomType | null;
    setSelectedRoom: Dispatch<any>;
}) {
    const [user] = useAuthState(authFirebase);
    return (
        <div className="flex items-center border-b p-2">
            <button className="mr-2 md:hidden" onClick={() => setSelectedRoom(null)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex w-full items-center justify-between">
                <p className="font-semibold text-white">{selectedRoom?.movie_name}</p>
                {/* <p className="text-sm text-gray-400">{selectedUser.isOnline ? "Online" : "Offline"}</p> */}
                <div className="flex items-center gap-x-2">
                    <Avatar.Group
                        size="small"
                        max={{
                            count: 2,
                            style: { color: "#f56a00", backgroundColor: "#fde3cf" }
                        }}
                    >
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                        <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                        <Tooltip title="Ant User" placement="top">
                            <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                        </Tooltip>
                        <Avatar style={{ backgroundColor: "#1677ff" }} icon={<AntDesignOutlined />} />
                    </Avatar.Group>

                    {user?.email === selectedRoom?.owner && (
                        <button className="rounded bg-red-500 px-2 py-1 text-white">Xóa phòng</button>
                    )}
                </div>
            </div>
        </div>
    );
}
