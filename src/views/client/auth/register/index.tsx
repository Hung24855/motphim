"use client";
import Input from "@/base/libs/input/page";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./style/index.css";
import { signUpSchema, SignUpType } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register_action } from "@/actions/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/base/libs/button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authFirebase, dbFirebase } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { handle_add_doc_firebase } from "@/database/firebase.services";

export default function RegisternPage() {
    const [globalMessage, setGlobalMessage] = useState<string>("");
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignUpType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(signUpSchema)
    });

    const Submit = async (data: SignUpType) => {
        const res = await register_action(data);
        if (res.status === "success") {
            toast.success(res.message);
            router.push("/dang-nhap");

            // Đăng ký tài khoản Firebase
            createUserWithEmailAndPassword(authFirebase, data.email, data.password)
                .then(async (userCredential) => {
                    const user = userCredential.user;

                    // Cập nhật displayName
                    await updateProfile(user, {
                        displayName: data.username
                    });
                    
                    // Ghi thông tin người dùng vài firestore
                    await handle_add_doc_firebase({
                        collectionName: "USERS",
                        data: {
                            name: data.username,
                            email: data.email,
                            uid: user.uid
                        }
                    });
                })
                .catch((error) => {
                    toast.error("Tài khoản đã tồn tại!");
                });
        } else {
            setGlobalMessage(res.message);
        }
    };
    return (
        <Fragment>
            <section className="bg-[#030A1B]">
                <div className="mx-auto flex flex-col items-center justify-center px-6 pt-28 md:min-h-screen lg:py-0">
                    <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-3 p-2 sm:p-6 md:space-y-4">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#295779] md:text-2xl">
                                ĐĂNG KÝ
                            </h1>
                            <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit(Submit)} method="POST">
                                <div>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input
                                                field={field}
                                                label="Email"
                                                placeholder="name@gmail.com"
                                                required
                                                error={errors.email}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name="username"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input
                                                field={field}
                                                label="Tên người dùng"
                                                placeholder="Nghiêm Hồng"
                                                required
                                                error={errors.username}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name="password"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input
                                                field={field}
                                                label="Mật khẩu"
                                                placeholder="••••••••"
                                                required
                                                error={errors.password}
                                                type="password"
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        name="confirm_password"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Input
                                                field={field}
                                                label="Nhập lại mật khẩu"
                                                placeholder="••••••••"
                                                required
                                                error={errors.confirm_password}
                                                type="password"
                                            />
                                        )}
                                    />
                                </div>

                                <div className="text-right">{globalMessage}</div>
                                <Button type="submit" block loading={isSubmitting}>
                                    Đăng ký
                                </Button>
                                <p className="text-sm font-light text-[#295779]">
                                    Bạn đã có tải khoản?{" "}
                                    <Link href="/dang-nhap" className="font-medium hover:underline">
                                        Đăng nhập
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
