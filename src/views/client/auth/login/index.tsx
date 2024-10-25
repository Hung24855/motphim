"use client";
import Input from "@/base/libs/input";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { signInSchema, SignInType } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login_action } from "@/actions/auth";
import Button from "@/base/libs/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "@/firebase";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [globalMessage, setGlobalMessage] = useState<string>("");
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignInType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(signInSchema)
    });

    const Submit = async (data: SignInType) => {
        try {
            const result = await login_action(data);

            if (!result?.message) {
                signInWithEmailAndPassword(authFirebase, data.email, data.password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                    })
                    .catch((error) => {
                        toast.error("Đăng nhập Firebase thất bại!");
                        console.log("Đăng nhập Firebase thất bại!", error.message);
                    });
            }
            if (result?.message) {
                setGlobalMessage(result.message);
            }
        } catch (error) {
            console.log("Error: Submit login", error);
        }
    };
    return (
        <Fragment>
            <section className="bg-[#030A1B]">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 pt-28 md:h-screen lg:py-0">
                    <div className="w-full rounded bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-4 sm:p-6 md:space-y-6">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#295779] md:text-2xl">
                                ĐĂNG NHẬP
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(Submit)} method="POST">
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
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="cursor-pointer select-none text-[#295779]"
                                            >
                                                Nhớ mật khẩu
                                            </label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-[#295779] hover:underline">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <div className="text-right text-red-500">{globalMessage}</div>
                                <Button type="submit" block loading={isSubmitting}>
                                    Đăng nhập
                                </Button>
                                <p className="text-sm font-light text-[#295779]">
                                    Bạn chưa có tải khoản?{" "}
                                    <Link href="/dang-ky" className="font-medium hover:underline">
                                        Đăng ký
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
