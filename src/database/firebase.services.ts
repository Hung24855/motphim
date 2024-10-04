import { dbFirebase } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export const handle_add_doc_firebase = async ({ collectionName, data }: { collectionName: string; data: any }) => {
    try {
        const DocumentReference = await addDoc(collection(dbFirebase, collectionName), {
            ...data,
            createdAt: serverTimestamp()
        });
        return DocumentReference;
    } catch (error) {
        console.log("Có lỗi xảy ra khi thêm document to firebase! ", error);
        toast.error("Có lỗi xảy ra khi thêm document to firebase!");
    }
};


