import { dbFirebase } from "@/firebase";
import { deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
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
        toast.error("Có lỗi xảy ra vui lòng thử lại sau!");
    }
};
export const handle_update_doc_firebase = async <T extends { [x: string]: any }>({
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
        await updateDoc(doc(dbFirebase, docInfo.collectionName, docInfo.docId), data);
    } catch (error) {
        console.log("Có lỗi xảy ra khi thêm document to firebase! ", error);
        toast.error("Có lỗi xảy ra vui lòng thử lại sau!");
    }
};
export const handle_delete_doc_firebase = async ({
    docInfo
}: {
    docInfo: {
        collectionName: string;
        docId: string;
    };
}) => {
    try {
        await deleteDoc(doc(dbFirebase, docInfo.collectionName, docInfo.docId));
    } catch (error) {
        console.log("Có lỗi xảy ra khi xóa document to firebase! ", error);
        toast.error("Có lỗi xảy ra vui lòng thử lại sau!");
    }
};

export const CONLLECTION = {
    CHAT_APP: "CHAT_APP",
    ROOM_MOVIES: "ROOM_MOVIES",
    USERS: "USERS"
};
