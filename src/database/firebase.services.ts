import { dbFirebase } from "@/firebase";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const handle_add_doc_firebase = async <T>({
    docInfo,
    data
}: {
    docInfo: {
        collectionName: string;
        docId: string;
    };
    data: T;
}) => {
    try {
        const DocumentReference = await setDoc(doc(dbFirebase, docInfo.collectionName, docInfo.docId), {
            ...data,
            createdAt: serverTimestamp()
        });
        return DocumentReference;
    } catch (error) {
        console.log("Có lỗi xảy ra khi thêm document to firebase! ", error);
        toast.error("Có lỗi xảy ra khi thêm document to firebase!");
    }
};

export const handle_update_doc_firebase = async ({
    docInfo,
    data
}: {
    docInfo: {
        collectionName: string;
        docId: string;
    };
    data: any;
}) => {
    try {
        await updateDoc(doc(dbFirebase, docInfo.collectionName, docInfo.docId), data);
    } catch (error) {
        console.log("Có lỗi xảy ra khi thêm document to firebase! ", error);
        toast.error("Có lỗi xảy ra khi update document to firebase!");
    }
};

export const CONLLECTION = {
    CHAT_APP: "CHAT_APP",
    ROOM_MOVIES: "ROOM_MOVIES",
    USERS: "USERS"
};
