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
    arrayRemove,
    runTransaction,
    deleteDoc,
    query,
    where
} from "firebase/firestore";
import Button from "@/base/libs/button";
import { array } from "zod";
import { toast } from "react-toastify";

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
            const citiesRef = collection(dbFirebase, "cities");

            await setDoc(doc(citiesRef, "SF"), {
                name: "San Francisco",
                state: "CA",
                country: "USA",
                capital: false,
                population: 860000,
                regions: ["west_coast", "norcal"]
            });
            await setDoc(doc(citiesRef, "LA"), {
                name: "Los Angeles",
                state: "CA",
                country: "USA",
                capital: false,
                population: 3900000,
                regions: ["west_coast", "socal"]
            });
            await setDoc(doc(citiesRef, "DC"), {
                name: "Washington, D.C.",
                state: null,
                country: "USA",
                capital: true,
                population: 680000,
                regions: ["east_coast"]
            });
            await setDoc(doc(citiesRef, "TOK"), {
                name: "Tokyo",
                state: null,
                country: "Japan",
                capital: true,
                population: 9000000,
                regions: ["kanto", "honshu"]
            });
            await setDoc(doc(citiesRef, "BJ"), {
                name: "Beijing",
                state: null,
                country: "China",
                capital: true,
                population: 21500000,
                regions: ["jingjinji", "hebei"]
            });

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

    const handlRunTransition = async () => {
        try {
            const VNRef = doc(dbFirebase, "cities", "VN");
            await runTransaction(dbFirebase, async (transaction) => {
                const VNdoc = await transaction.get(VNRef);
                if (!VNdoc.exists()) {
                    throw "Document does not exist!";
                }

                const newValue = VNdoc.data().array;
                transaction.update(VNRef, { array: [...newValue.filter((item: any) => item % 2 === 0)] });
            });

            toast.success("Đã update firebase");
        } catch (error) {
            toast.error(error as string);
            console.log("Run transition error", error);
        }
    };

    const handlDeleteDoc = async () => {
        try {
            await deleteDoc(doc(dbFirebase, "cities", "VN"));
            toast.success("Xóa document thànhc công");
        } catch (error) {
            toast.error(error as string);
        }
    };

    const handleGetMutilpleDoc = async () => {
        try {
            // Tham chiếu đến document "ROOM1" trong collection "CHAT_APP"
            const docRef = doc(dbFirebase, "CHAT_APP", "ROOM1");

            // Lấy dữ liệu của document
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Lấy dữ liệu của trường "message"
                const messages = docSnap.data().message;

                // Duyệt qua các tin nhắn
                Object.keys(messages).forEach((key) => {
                    const message = messages[key];
                    console.log(`${key}: From ${message.from} - Message: ${message.message}`);
                });

                toast.success("Đã lấy tin nhắn thành công");
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            toast.error(error as string);
        }
    };
    return (
        <Fragment>
            <MaxWidth className="flex min-h-screen items-center pt-40 text-white">
                {/* <Button onClick={handleAddDoc}>Tạo document</Button> */}
                <Button onClick={handleSetDoc}>SetDoc document</Button>
                {/* <Button onClick={handleSetDoc2}>SetDoc document 2</Button> */}
                {/* <Button onClick={handleReadDoc}>Đọc document</Button> */}
                {/* <Button onClick={handleUpdateDoc}>Update document</Button> */}
                {/* <Button onClick={handleUpdateTimeStamp}>Update TimeStamp</Button> */}
                {/* <Button onClick={handleUpdateArray}>Update Array</Button> */}
                {/* <Button onClick={handlRunTransition}>Run transition</Button> */}
                {/* <Button onClick={handlDeleteDoc}>Delete Document</Button> */}
                <Button onClick={handleGetMutilpleDoc}>Lấy nhiều document</Button>
                <div></div>
            </MaxWidth>
        </Fragment>
    );
}
