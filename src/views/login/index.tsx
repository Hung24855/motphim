"use client";
import Input from "@/base/libs/input/page";
import { Button } from "antd";
import Link from "next/link";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import "./style/index.css";
import { signInSchema, SignInType } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignInType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(signInSchema)
    });

    const Submit = (data: SignInType) => {};
    return (
        <Fragment>
            <section className="bg-[#030A1B]">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 pt-28 md:h-screen lg:py-0">
                    <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
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
                                <Button
                                    block
                                    htmlType="submit"
                                    className="bg-[#295779] py-5 text-white hover:text-red-500"
                                    loading={isSubmitting}
                                >
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
