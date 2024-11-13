import { useCountdownTimer } from "@/base/hooks/useCountdownTimer";
import Button from "@/base/libs/button";
import Input from "@/base/libs/input";
import { saveToLocalStorage } from "@/base/utils/function";
import { AccountsService } from "@/domain/tai-khoan/services";
import { verifyEmailAndCodeSchema, VerifyEmailAndCodeType } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TOKEN_VERIFY_CODE } from ".";

type IVerifyEmailAndCodeProps = {
    setIsCodeVerified: React.Dispatch<React.SetStateAction<boolean>>;
    setGlobalMessage: React.Dispatch<React.SetStateAction<string>>;
    globalMessage: string;
};
export default function VerifyEmailAndCode(props: IVerifyEmailAndCodeProps) {
    const { setIsCodeVerified, setGlobalMessage, globalMessage } = props;
    const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

    const {
        control,
        formState: { errors },
        trigger,
        getValues
    } = useForm<VerifyEmailAndCodeType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(verifyEmailAndCodeSchema)
    });

    const { start, remainingTime } = useCountdownTimer();
    const {
        SendEmailMutation,
        isPendingSendEmail,
        VerifyCodeMutation,
        isPendingVerify,
    } = AccountsService.useAccounts();
    const handleSendEmail = async () => {
        const checkEmail = await trigger("email");
        if (checkEmail) {
            const email = getValues("email");
            start();
            SendEmailMutation(email, {
                onSuccess: () => {
                    setIsEmailVerified(true);
                    setGlobalMessage("");
                },
                onError: (error) => {
                    setGlobalMessage(error.message);
                }
            });
        }
    };

    const handleVerifyCode = async () => {
        const checkCode = await trigger("code");
        if (checkCode) {
            const code = getValues("code");
            const email = getValues("email");

            VerifyCodeMutation(
                { code, email },
                {
                    onSuccess: (data) => {
                        setIsCodeVerified(true);
                        saveToLocalStorage({ key: TOKEN_VERIFY_CODE, value: data.token });
                        setGlobalMessage("");
                    },
                    onError: (error) => {
                        setGlobalMessage(error.message);
                    }
                }
            );
        }
    };
    return (
        <form className="space-y-2" method="POST">
            {isEmailVerified ? (
                <div className="flex gap-x-2">
                    <Controller
                        name="code"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input field={field} label="Mã xác thực" placeholder="code" required error={errors.code} />
                        )}
                    />
                    <div
                        className={clsx(
                            "mb-3 flex h-10 w-[75px] items-center justify-center self-end rounded border-[2px] px-1",
                            remainingTime === 0 ? "cursor-pointer border-red-400" : "border-gray-400"
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
            <div className="text-right text-red-500">{globalMessage}</div>
            {!isEmailVerified ? (
                <Button type="button" block onClick={handleSendEmail} loading={isPendingSendEmail}>
                    Lấy lại mật khẩu
                </Button>
            ) : (
                <Button type="button" block onClick={handleVerifyCode} loading={isPendingVerify}>
                    Xác nhận
                </Button>
            )}
        </form>
    );
}
