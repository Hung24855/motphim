import { Fragment, useContext, useState } from "react";
import { Avatar, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { authFirebase } from "@/firebase";
import { PiWarningCircleFill } from "react-icons/pi";
import { ChatRoomContext } from ".";
import { ModalMotion } from "@/base/libs/modal";
import { CONLLECTION, handle_delete_doc_firebase } from "@/database/firebase.services";

export default function ChatHeader() {
    const [user] = useAuthState(authFirebase);
    const { selectedRoom, setSelectedRoom } = useContext(ChatRoomContext);
    const [isOpenModelConfirm, setisOpenModelConfirm] = useState<boolean>(false);
    const [isLoadingDeleteRoom, setisLoadingDeleteRoom] = useState<boolean>(false);

    const handleDeleteRoom = async () => {
        setisLoadingDeleteRoom(true);
        await handle_delete_doc_firebase({
            docInfo: {
                collectionName: CONLLECTION.ROOM_MOVIES,
                docId: selectedRoom?.doc_id as string
            }
        });
        setisLoadingDeleteRoom(false);
        setSelectedRoom(null);
    };
    return (
        <Fragment>
            <button className="mr-2" onClick={() => setSelectedRoom(null)}>
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
                        <button
                            className="rounded bg-red-500 px-2 py-1 text-white"
                            onClick={() => setisOpenModelConfirm(true)}
                        >
                            Xóa phòng
                        </button>
                    )}
                </div>
            </div>

            <ModalMotion
                textHeader="Xác nhận xóa"
                onClose={() => {
                    setisOpenModelConfirm(false);
                }}
                onOk={handleDeleteRoom}
                isOpen={isOpenModelConfirm}
                textOk="Xóa"
                loading={isLoadingDeleteRoom}
                okButtonClassName="!bg-red-500"
                modalContainerClassName="!top-40"
            >
                <div className="relative rounded border border-red-500 bg-red-100 px-4 py-3 text-red-700" role="alert">
                    <span className="flex items-center gap-x-1">
                        <PiWarningCircleFill /> Việc làm này có thể ảnh hưởng đến mọi người trong phòng!
                    </span>
                </div>
            </ModalMotion>
        </Fragment>
    );
}
