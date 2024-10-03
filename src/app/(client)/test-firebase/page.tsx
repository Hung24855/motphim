"use client";
import MaxWidth from "@/components/layout/max-width";
import { dbFirebase } from "@/firebase";
import { Fragment, useEffect, useState } from "react";
import {
    doc,
    getDoc,
    setDoc,
    onSnapshot,
    addDoc,
    collection,
    getDocs,
    Timestamp,
    updateDoc,
    serverTimestamp,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import Button from "@/base/libs/button";
import { array } from "zod";

export default function page() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const unsub = onSnapshot(collection(dbFirebase, "APP_CHAT_ID"), (snapShot) => {
            let list: any = [];
            snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });

            // console.log("list", list);
        });

        return () => {
            unsub();
        };
    }, []);

    const handleAddDoc = async () => {
        try {
            const docRef = await addDoc(collection(dbFirebase, "APP_CHAT_ID"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const handleSetDoc = async () => {
        try {
            await setDoc(
                doc(dbFirebase, "cities", "VN"),
                {
                    array: [1, 2, 3, 4, 5]
                },
                {
                    merge: true,
                    mergeFields: ["array"]
                }
            );

            console.log("Đã set data vào firebase thành công! ");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const handleSetDoc2 = async () => {
        try {
            const docData = {
                stringExample: "Hello world!",
                booleanExample: true,
                numberExample: 3.14159265,
                dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
                arrayExample: [5, true, "hello"],
                nullExample: null,
                objectExample: {
                    a: 5,
                    b: {
                        nested: "foo"
                    }
                }
            };
            await setDoc(doc(dbFirebase, "data", "one"), docData);
            console.log("Đã set data vào firebase thành công! ");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    const handleReadDoc = async () => {
        const querySnapshot = await getDocs(collection(dbFirebase, "APP_CHAT_ID"));

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    };

    const handleUpdateDoc = async () => {
        const fieldfUpdateRef = doc(dbFirebase, "cities", "LA");

        await updateDoc(fieldfUpdateRef, {
            capital: true
        });
        console.log("Đã update firebase");
    };
    const handleUpdateTimeStamp = async () => {
        const fieldfUpdateRef = doc(dbFirebase, "cities", "LA");

        await updateDoc(fieldfUpdateRef, {
            timestamp: serverTimestamp()
        });
        console.log("Đã update firebase");
    };
    const handleUpdateArray = async () => {
        const fieldfUpdateRef = doc(dbFirebase, "cities", "VN");

        await updateDoc(fieldfUpdateRef, {
            // array: arrayUnion(5)
            array: arrayRemove("NghiemHong")
        });
        console.log("Đã update firebase");
    };

    return (
        <Fragment>
            <MaxWidth className="flex min-h-screen items-center pt-40 text-white">
                {/* <Button onClick={handleAddDoc}>Tạo document</Button> */}
                {/* <Button onClick={handleSetDoc}>SetDoc document</Button> */}
                {/* <Button onClick={handleSetDoc2}>SetDoc document 2</Button> */}
                {/* <Button onClick={handleReadDoc}>Đọc document</Button> */}
                {/* <Button onClick={handleUpdateDoc}>Update document</Button> */}
                {/* <Button onClick={handleUpdateTimeStamp}>Update TimeStamp</Button> */}
                <Button onClick={handleUpdateArray}>Update Array</Button>
                <div></div>
            </MaxWidth>
        </Fragment>
    );
}
