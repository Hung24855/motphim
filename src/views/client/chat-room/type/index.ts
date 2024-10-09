import { MovieForCardDTO } from "@/domain/phim/dto";
import { Timestamp } from "firebase/firestore";
import { Dispatch } from "react";

export type RoomType = {
    createdAt: Timestamp;
    doc_id: string;
    isPlay: boolean;
    members: string[];
    messages: {
        avatar?: string;
        send_id: string;
        msg: string;
        username: string;
        time: Timestamp;
    }[];
    list_movies: MovieFirebaseInfo[];
    movie_link: string;
    movie_name: string;
    owner: string;
};

export type MovieFirebaseInfo = MovieForCardDTO

export type RoomsType = RoomType[];

export type AddRoomType = Omit<RoomType, "createdAt" | "doc_id">;

export type ChatRoomContextType = {
    selectedRoom: RoomType | null;
    setSelectedRoom: Dispatch<RoomType | null>;
    RoomInfo: Omit<RoomType, "doc_id"> | undefined;
};
