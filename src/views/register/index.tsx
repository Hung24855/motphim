"use client";
import Input from "@/base/libs/input/page";
import { Button } from "antd";
import Link from "next/link";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import "./style/index.css";
import { signUpSchema, SignUpType } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisternPage() {
    const {
        control,
        handleSubmit,
        formState: { errors },

        watch
    } = useForm<SignUpType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(signUpSchema)
    });

    const Submit = (data: SignUpType) => {};
    return (
        <Fragment>
            <section className="bg-[#030A1B]">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 pt-28 md:h-screen lg:py-0">
                    <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#295779] md:text-2xl">
                                ĐĂNG KÝ
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

                                <Button
                                    block
                                    htmlType="submit"
                                    className="bg-[#295779] py-5 text-white hover:text-red-500"
                                >
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
