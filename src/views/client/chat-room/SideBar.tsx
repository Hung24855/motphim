import Input from "@/base/libs/input";
import { ModalMotion } from "@/base/libs/modal";
import { authFirebase } from "@/firebase";
import { useFirestore } from "@/infrastructure/hooks/useFirestore";
import { ChangeEvent, Dispatch, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AddRoomType, RoomsType, RoomType } from "./type";
import { CONLLECTION, handle_add_doc_firebase } from "@/database/firebase.services";
import { toast } from "react-toastify";
import { ChatRoomContext } from ".";

const initCreateRoomForm = {
    movie_name: ""
};

export default function SideBar() {
    const { selectedRoom, setSelectedRoom } = useContext(ChatRoomContext);
    const [ModalCreateRoom, setModalCreateRoom] = useState<boolean>(false);
    const [RoomCreateForm, setRoomCreateForm] = useState(initCreateRoomForm);
    const [loading, setloading] = useState<boolean>(false);
    const [user] = useAuthState(authFirebase);

    //Lắng nghe danh sách user
    // const condition: ConditionType = useMemo(() => {
    //     return {
    //         fieldName: "uid",
    //         operator: "!=",
    //         compareValue: user?.uid
    //     };
    // }, [user]);

    // const { doccument: ListUsers } = useFirestore({
    //     collectionName: "USERS",
    //     condition: condition
    // });

    //Lắng nghe danh sách các phòng

    const { doccument: Rooms }: { doccument: RoomsType } = useFirestore({
        collectionName: "ROOM_MOVIES"
    });
    console.log("🚀 ~ Rooms:", Rooms);

    const handleCreateRoom = async () => {
        if (!RoomCreateForm.movie_name) return toast.error("Vui lòng nhập tên phòng!");
        setloading(true);
        await handle_add_doc_firebase<AddRoomType>({
            docInfo: { collectionName: CONLLECTION.ROOM_MOVIES, docId: Date.now().toString() },
            data: {
                isPlay: false,
                members: [user?.uid as string],
                messages: [],
                movie_link: "",
                movie_name: RoomCreateForm.movie_name,
                owner: user?.email as string
            }
        });
        setloading(false);
        onCloseModal();
        toast.success("Tạo phòng mới thành công!");
    };

    const onCloseModal = () => {
        setModalCreateRoom(false);
        setRoomCreateForm(initCreateRoomForm);
    };
    return (
        <div className={`flex h-full flex-col border-r ${selectedRoom ? "hidden" : "block"} w-full md:w-64`}>
            {/* Search */}
            {/* <div className="relative mb-2 mr-2 flex">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-2 py-1 text-white placeholder-gray-400 focus:outline-none"
                />
            </div> */}
            <div className="mr-2">
                <button
                    className="block w-full rounded bg-red-700 px-3 py-2 text-white"
                    onClick={() => setModalCreateRoom(true)}
                >
                    Tạo phòng
                </button>
            </div>

            {/* Chat list */}
            <div className="flex flex-col py-2">
                <h2 className="mb-4 text-lg font-semibold text-white">Danh sách phòng</h2>
                <div className="scrollbar-none flex-1 overflow-y-auto">
                    {/* Danh sách người dùng */}
                    {/* {ListUsers?.length > 0 &&
                        ListUsers?.map((user: any) => (
                            <div
                                key={user.uid}
                                className="mb-4 flex cursor-pointer items-center rounded p-2 hover:bg-gray-700"
                                onClick={() => setSelectedUser(user)}
                            >
                                <div className="relative mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt="Avatar preview"
                                            width={20}
                                            height={20}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="font-semibold text-gray-600">{user.name[0]}</span>
                                    )}

                                    {true && (
                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-700 bg-green-500"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between">
                                        <p className="text-sm font-medium text-white">{user.name}</p>
                                        <span className="text-xs text-gray-400">10:30</span>
                                    </div>
                                    <p className="truncate text-xs text-gray-400">Tin nhắn cuối cùng!</p>
                                </div>
                            </div>
                        ))} */}

                    {/* Danh sách các phòng */}
                    {Rooms?.length > 0 &&
                        Rooms.map((room) => (
                            <div
                                key={room.doc_id}
                                className="mb-2 flex cursor-pointer items-center rounded p-2 hover:bg-gray-700"
                                onClick={() => setSelectedRoom(room)}
                            >
                                <div className="relative mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                                    <span className="font-semibold text-gray-600">R</span>

                                    {true && (
                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-700 bg-green-500"></div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between">
                                        <p className="text-sm font-medium text-white">{room.movie_name}</p>
                                        <span className="text-xs text-gray-400">10:30</span>
                                    </div>
                                    {/* <p className="truncate text-xs text-gray-400">Tin nhắn cuối cùng!</p> */}
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <ModalMotion
                textHeader="Tạo phòng xem phim"
                onClose={onCloseModal}
                onOk={() => {
                    handleCreateRoom();
                }}
                isOpen={ModalCreateRoom}
                textOk="Tạo phòng"
                loading={loading}
                okButtonClassName="!bg-admin_primary"
                modalContainerClassName="!top-40 w-[500px]"
                headerModalClassName="text-center text-xl"
            >
                <Input
                    label="Tên phòng"
                    placeholder="Phim kinh dị ban đêm"
                    value={RoomCreateForm.movie_name}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setRoomCreateForm({ ...RoomCreateForm, movie_name: e.target.value })
                    }
                />
                {/* <Input
                    label="Mật khẩu"
                    placeholder="Mật khẩu"
                    // value={genre.slug}
                    type="password"
                    // onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGenre({ ...genre, slug: e.target.value })}
                /> */}
            </ModalMotion>
        </div>
    );
}
