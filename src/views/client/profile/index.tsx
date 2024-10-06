"use client";
import { sessionContext } from "@/base/provider/next-auth";
import MaxWidth from "@/components/layout/max-width";
import { AccountsService } from "@/domain/tai-khoan/services";
import { storageFirebase } from "@/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";

const initFormData = {
    username: "",
    email: "",
    bio: ""
};

export default function ProfileView() {
    const { session } = useContext(sessionContext);
    const [fileAvatar, setFileAvatar] = useState<globalThis.File>();
    const [avatarSession, setAvatarSession] = useState<string | null>(session?.user.avatar ?? null);
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
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
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
                                }
                            }
                        );
                    });
                }
            );
        } else {
            UpdateUserMutation(
                { username: formData.username },
                {
                    onSuccess: () => {
                        toast.success("Cập nhật thông tin thành công!");
                    }
                }
            );
        }
    };

    return (
        <MaxWidth className="min-h-screen">
            <div className="pb-10 pt-20">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-md">
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
                                                    className="h-20 w-20 rounded-full object-cover ring-4 ring-purple-300"
                                                />
                                            ) : avatarSession ? (
                                                <Image
                                                    src={avatarSession}
                                                    alt="Avatar preview"
                                                    width={80}
                                                    height={80}
                                                    className="h-20 w-20 rounded-full object-cover ring-4 ring-purple-300"
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
                                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                                        Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="name"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                                        placeholder="Họ và tên"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        disabled
                                        className="block w-full rounded-md bg-gray-200 p-3"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="bio" className="block text-lg font-medium text-gray-700">
                                        Giới thiệu bản thân
                                    </label>
                                    <textarea
                                        name="bio"
                                        id="bio"
                                        rows={3}
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md bg-gray-100 p-3 focus:outline-none"
                                        placeholder="Giới thiệu bản thân"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                                >
                                    {process !== 0 ? `${process}%` : "Cập nhật"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidth>
    );
}
