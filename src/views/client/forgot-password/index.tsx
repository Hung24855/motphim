"use client";
import { Fragment, useState } from "react";
import ResetPassword from "./ResetPassword";
import VerifyEmailAndCode from "./VerifyEmailAndCode";

export const TOKEN_VERIFY_CODE = "tokenVerifyCode";

export default function ForgotPasswordView() {
    const [globalMessage, setGlobalMessage] = useState<string>("");
    const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);

    return (
        <Fragment>
            <section className="bg-[#030A1B]">
                <div className="mx-auto flex flex-col items-center justify-center px-2 py-8 pt-28 md:h-screen lg:py-0">
                    <div className="w-full rounded bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-2 p-4 sm:p-6 md:space-y-4">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-[#295779] md:text-2xl">
                                QUÊN MẬT KHẨU
                            </h1>
                            {!isCodeVerified ? (
                                <VerifyEmailAndCode
                                    globalMessage={globalMessage}
                                    setIsCodeVerified={setIsCodeVerified}
                                    setGlobalMessage={setGlobalMessage}
                                />
                            ) : (
                                <ResetPassword />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}
