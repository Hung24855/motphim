"use client";
import Button from "@/base/libs/button";
import Input from "@/base/libs/input";
import { saveToLocalStorage } from "@/base/utils/function";
import { AccountsService } from "@/domain/tai-khoan/services";
import { verifyEmailSchema, VerifyEmailType } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TOKEN_VERIFY_CODE } from ".";
import OTP from "@/base/libs/otp";
import { toast } from "react-toastify";
import { useCountdownTimer } from "@/base/hooks/useCountdownTimer";
const CODE_LENGTH = 6;

type IVerifyEmailAndCodeProps = {
    setIsCodeVerified: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    errorMessage: string;
};
export default function VerifyEmailAndCode(props: IVerifyEmailAndCodeProps) {
    const { setIsCodeVerified, setErrorMessage, errorMessage } = props;
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
    const [code, SetCode] = useState<string>("");

    const {
        control,
        formState: { errors },
        trigger,
        getValues
    } = useForm<VerifyEmailType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(verifyEmailSchema)
    });

    const { start, remainingTime } = useCountdownTimer(60, "verify-code");
    const { SendEmailMutation, isPendingSendEmail, VerifyCodeMutation, isPendingVerify } =
        AccountsService.useAccounts();
    const handleSendEmail = async () => {
        const checkEmail = await trigger("email");
        if (checkEmail) {
            const email = getValues("email");
            SendEmailMutation(email, {
                onSuccess: () => {
                    setIsEmailVerified(true);
                    setErrorMessage("");
                    start();
                },
                onError: (error) => {
                    setErrorMessage(error.message);
                }
            });
        }
    };

    const handleVerifyCode = async () => {
        if (code) {
            const email = getValues("email");
            VerifyCodeMutation(
                { code, email },
                {
                    onSuccess: (data) => {
                        setIsCodeVerified(true);
                        saveToLocalStorage({ key: TOKEN_VERIFY_CODE, value: data.token });
                        setErrorMessage("");
                    },
                    onError: (error) => {
                        setErrorMessage(error.message);
                        toast.error(error.message, { position: "bottom-left" });
                    }
                }
            );
        }
    };
    return (
        <form className="space-y-2" method="POST">
            {isEmailVerified ? (
                <Fragment>
                    <div className="flex justify-between gap-x-2">
                        <OTP
                            length={CODE_LENGTH}
                            onConpleteOTP={(code) => {
                                SetCode(code);
                            }}
                            error={!!errorMessage}
                            className="!gap-3"
                            inputclassName="!border-[2px]"
                            eventGetCode="onChange"
                            onpreviousSibling={() => {
                                SetCode("");
                                setErrorMessage("");
                            }}
                        />
                        <div
                            className={clsx(
                                "flex h-10 w-[75px] items-center justify-center self-end rounded border-[2px] px-1",
                                remainingTime === 0 ? "cursor-pointer border-[#295779]" : "border-gray-400"
                            )}
                            onClick={() => {
                                if (remainingTime === 0) {
                                    handleSendEmail();
                                }
                            }}
                        >
                            {remainingTime > 0 ? remainingTime : "Gửi mã"}
                        </div>
                    </div>
                </Fragment>
            ) : (
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input field={field} label="Email đăng ký" placeholder="Email" required error={errors.email} />
                    )}
                />
            )}

            {!isEmailVerified ? (
                <Button type="button" block onClick={handleSendEmail} loading={isPendingSendEmail}>
                    Gửi yêu cầu
                </Button>
            ) : (
                <Button type="button" block onClick={handleVerifyCode} loading={isPendingVerify} disabled={!code}>
                    Xác nhận
                </Button>
            )}
        </form>
    );
}
