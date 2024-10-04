import { dbFirebase } from "@/firebase";
import { collection, FieldPath, onSnapshot, orderBy, query, where, WhereFilterOp } from "firebase/firestore";
import { useEffect, useState } from "react";

export type ConditionType = { fieldName: string | FieldPath; operator: WhereFilterOp; compareValue: unknown };

export const useFirestore = ({ collectionName, condition }: { collectionName: string; condition?: ConditionType }) => {
    const [doccument, setDoccument] = useState<any>([]);

    useEffect(() => {
        let conllectionRef = collection(dbFirebase, collectionName);
        let q = query(conllectionRef, orderBy("createdAt", "desc"));
        
        
        if (condition && condition.fieldName && condition.operator && condition.compareValue) {
            q = query(conllectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
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
