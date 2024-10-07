import { dbFirebase } from "@/firebase";
import { collection, FieldPath, limit, onSnapshot, orderBy, query, where, WhereFilterOp } from "firebase/firestore";
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
