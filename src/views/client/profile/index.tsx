"use client";
import { sessionContext } from "@/provider/next-auth";
import MaxWidth from "@/components/layout/max-width";
import { AccountsService } from "@/domain/tai-khoan/services";
import { storageFirebase } from "@/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { CONLLECTION, handle_update_doc_firebase } from "@/database/firebase.services";
import Button from "@/base/libs/button";
import Input from "@/base/libs/input";

const initFormData = {
    username: "",
    email: "",
    bio: ""
};

export default function ProfileView() {
    const { session } = useContext(sessionContext);
    const { update: updateSession } = useSession();
    const [fileAvatar, setFileAvatar] = useState<globalThis.File>();
    const [process, setProcess] = useState<number>(0);
    const [formData, setFormData] = useState({
        ...initFormData,
        username: session?.user.username ?? "",
        email: session?.user.email ?? ""
    });
    const { UpdateUserMutation, isPending } = AccountsService.update_user_info();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFileAvatar(file);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.username) return toast.error("Vui lòng nhập tên người dùng!");

        if (fileAvatar) {
            const imagesRef = ref(storageFirebase, "images" + fileAvatar.name);
            const uploadTask = uploadBytesResumable(imagesRef, fileAvatar);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProcess(Math.floor(progress));
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Tải lên bị dừng!");
                            break;
                        case "running":
                            console.log("Đang tải lên...");
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        UpdateUserMutation(
                            { username: formData.username, avatar: downloadURL },
                            {
                                onSuccess: () => {
                                    toast.success("Cập nhật thông tin thành công!");
                                    setProcess(0);
                                    
                                    updateSession({
                                        ...session?.user,
                                        username: formData.username,
                                        avatar: downloadURL
                                    });
                                    // Đồng bộ thông tin trên fire-base
                                    // handle_update_doc_firebase({
                                    //     docInfo: {
                                    //         collectionName: CONLLECTION.USERS,
                                    //         docId: session?.user.email ?? ""
                                    //     },
                                    //     data: {
                                    //         name: formData.username,
                                    //         avatar: downloadURL
                                    //     }
                                    // });
                                }
                            }
                        );
                    });
                }
            );
        } else {
            UpdateUserMutation(
                { username: formData.username, avatar: session?.user.avatar ?? "" },
                {
                    onSuccess: () => {
                        toast.success("Cập nhật thông tin thành công!");
                    

                        updateSession({
                            ...session?.user,
                            username: formData.username,
                            avatar: session?.user.avatar ?? ""
                        });
                        // handle_update_doc_firebase({
                        //     docInfo: {
                        //         collectionName: CONLLECTION.USERS,
                        //         docId: session?.user.email ?? ""
                        //     },
                        //     data: {
                        //         name: formData.username,
                        //         avatar: session?.user.avatar ?? ""
                        //     }
                        // });
                    }
                }
            );
        }
    };

    return (
        <MaxWidth className="min-h-screen">
            <div className="pb-10 pt-20">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl overflow-hidden rounded bg-white shadow-md">
                        <div className="px-8 py-6">
                            <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">Thông tin cá nhân</h1>
                            <form onSubmit={handleSubmit} className="space-y-2">
                                <div className="space-y-1">
                                    <div className="flex items-center justify-center space-x-4">
                                        <div className="relative shrink-0">
                                            {fileAvatar ? (
                                                <Image
                                                    src={
                                                        fileAvatar
                                                            ? URL.createObjectURL(fileAvatar)
                                                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                                    }
                                                    alt="Avatar preview"
                                                    width={80}
                                                    height={80}
                                                    className="h-20 w-20 rounded-full object-cover ring-2 ring-purple-300"
                                                />
                                            ) : session?.user.avatar ? (
                                                <Image
                                                    src={session?.user.avatar}
                                                    alt="Avatar preview"
                                                    width={80}
                                                    height={80}
                                                    className="h-20 w-20 rounded-full object-cover ring-2 ring-purple-300"
                                                />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 ring-4 ring-purple-300">
                                                    <span className="text-4xl text-purple-500">?</span>
                                                </div>
                                            )}
                                            <label
                                                htmlFor="avatar-upload"
                                                className="absolute bottom-0 right-0 cursor-pointer font-semibold text-gray-700 hover:scale-105"
                                            >
                                                <TbEdit size={22} />
                                                <input
                                                    id="avatar-upload"
                                                    name="avatar"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Input
                                        label="Họ và tên"
                                        name="username"
                                        id="name"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Họ và tên"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Input
                                        label="Email"
                                        disabled
                                        id="email"
                                        value={formData.email}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Input
                                        label="Giới thiệu bản thân"
                                        name="bio"
                                        id="bio"
                                        value={formData.bio}
                                        placeholder="Giới thiệu bản thân"
                                        onChange={handleInputChange}
                                        type="textarea"
                                        rows={3}
                                    />
                                </div>

                                <Button block loading={isPending || process !== 0} type="submit">
                                    {process !== 0 ? `${process}%` : "Cập nhật"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidth>
    );
}
