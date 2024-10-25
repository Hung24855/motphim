import Input from "@/base/libs/input";
import { ModalMotion } from "@/base/libs/modal";
import { authFirebase } from "@/firebase";
import { useFirestore } from "@/infrastructure/hooks/useFirestore";
import { ChangeEvent, Fragment, useContext, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AddRoomType, RoomsType } from "./type";
import { CONLLECTION, handle_add_doc_firebase } from "@/database/firebase.services";
import { toast } from "react-toastify";
import { ChatRoomContext } from ".";
import { convertTime } from "@/base/utils/function";
import { serverTimestamp, Timestamp } from "firebase/firestore";

const initCreateRoomForm = {
    movie_name: ""
};

export default function SideBar() {
    const { setSelectedRoom } = useContext(ChatRoomContext);
    const [ModalCreateRoom, setModalCreateRoom] = useState<boolean>(false);
    const [RoomCreateForm, setRoomCreateForm] = useState(initCreateRoomForm);
    const [loading, setloading] = useState<boolean>(false);
    const [user] = useAuthState(authFirebase);
    const inputRef = useRef<HTMLInputElement>(null);

    //Lắng nghe danh sách các phòng
    const { doccument: Rooms }: { doccument: RoomsType } = useFirestore({
        collectionName: "ROOM_MOVIES"
    });

    const handleCreateRoom = async () => {
        if (!RoomCreateForm.movie_name) return toast.error("Vui lòng nhập tên phòng!");
        setloading(true);
        await handle_add_doc_firebase<AddRoomType>({
            docInfo: { collectionName: CONLLECTION.ROOM_MOVIES, docId: Date.now().toString() },
            data: {
                createdAt: serverTimestamp() as Timestamp,
                isPlay: false,
                members: [user?.uid as string],
                messages: [],
                movie_link: "",
                list_movies: [],
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

    

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [ModalCreateRoom]);

    return (
        <Fragment>
            <div className="mr-2">
                <button
                    className="block w-full rounded bg-red-700 px-3 py-2 text-white"
                    onClick={() => setModalCreateRoom(true)}
                >
                    Tạo phòng
                </button>
            </div>
            <h2 className="mb-4 mt-4 text-lg font-semibold text-white">Danh sách phòng</h2>
            {/* Chat list */}

            <div className="scrollbar-none flex h-[calc(100vh-200px)] flex-col overflow-y-auto pb-2">
                {/* Danh sách các phòng */}
                {Rooms.length > 0 &&
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
                                    <span className="text-xs text-gray-400 block min-w-[70px]">
                                        {convertTime(room.createdAt?.toDate().toString())}
                                    </span>
                                </div>
                            
                            </div>
                        </div>
                    ))}
            </div>

            <ModalMotion
                textHeader="Tạo phòng xem phim"
                onClose={onCloseModal}
                onOk={handleCreateRoom}
                isOpen={ModalCreateRoom}
                textOk="Tạo phòng"
                loading={loading}
                modalContainerClassName="!top-40 w-[500px]"
                headerModalClassName="text-center text-xl"
            >
                <Input
                    label="Tên phòng"
                    placeholder="Nhập tên phòng"
                    value={RoomCreateForm.movie_name}
                    onKeyDown={(event: any) => {
                        if (event.key === "Enter") {
                            handleCreateRoom();
                        }
                    }}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setRoomCreateForm({ ...RoomCreateForm, movie_name: e.target.value })
                    }
                    ref={inputRef}
                />
            </ModalMotion>
        </Fragment>
    );
}
