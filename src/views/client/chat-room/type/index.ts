import { Timestamp } from "firebase/firestore";

export type RoomType = {
    createdAt: Timestamp;
    doc_id: string;
    isPlay: boolean;
    members: string[];
    messages: {
        send_id: string;
        msg: string;
        name: string;
        time: Timestamp;
    }[];
    movie_link: string;
    movie_name: string;
    owner: string;
};

export type RoomsType = RoomType[];

export type AddRoomType = Omit<RoomType, "createdAt" | "doc_id">;
