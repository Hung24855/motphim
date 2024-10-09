import { dbFirebase } from "@/firebase";
import {
    collection,
    doc,
    FieldPath,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
    WhereFilterOp
} from "firebase/firestore";
import { useEffect, useState } from "react";

export type ConditionType = { fieldName: string | FieldPath; operator: WhereFilterOp; compareValue: unknown };

export const useFirestore = ({
    collectionName,
    condition,
    limit: limitNumber = 10
}: {
    collectionName: string;
    condition?: ConditionType;
    limit?: number;
}) => {
    const [doccument, setDoccument] = useState<any>([]);

    useEffect(() => {
        let conllectionRef = collection(dbFirebase, collectionName);
        let q = query(conllectionRef, orderBy("createdAt", "desc"), limit(limitNumber));

        if (condition && condition.fieldName && condition.operator && condition.compareValue) {
            q = query(
                conllectionRef,
                where(condition.fieldName, condition.operator, condition.compareValue),
                limit(limitNumber)
            );
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                doc_id: doc.id
            }));
            setDoccument(docs);
        });
        return () => unsubscribe();
    }, [collectionName, condition]);
    return { doccument };
};

export const useFirestoreWithDocId = <T>({ collectionName, docId }: { collectionName: string; docId: string }) => {
    const [doccument, setDoccument] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        if(!docId) return;
        
        let docRef = doc(dbFirebase, collectionName, docId);

        // Bắt đầu quá trình tải
        setIsLoading(true);

        const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
            if (querySnapshot.exists()) {
                const docs = {
                    ...querySnapshot.data()
                } as T;
                setDoccument(docs);
            } else {
                setDoccument(undefined); // Nếu tài liệu không tồn tại
            }

            // Kết thúc quá trình tải
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName, docId]);

    return { doccument, isLoading };
};
