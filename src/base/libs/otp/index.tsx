"use client";
import clsx from "clsx";
import { HTMLAttributes, useState } from "react";

type Props = {
    length: number;
    onConpleteOTP: (otp: string) => void;
    onnextSibling?: () => void;
    onpreviousSibling?: () => void;
    className?: HTMLAttributes<HTMLDivElement>["className"];
    inputclassName?: HTMLAttributes<HTMLInputElement>["className"];
    error?: boolean;
    inputErrorColor?: HTMLAttributes<HTMLInputElement>["className"];
    eventGetCode?: "onEnter" | "onChange";
};

export default function OTP({
    length,
    onConpleteOTP,
    onnextSibling = () => {},
    onpreviousSibling = () => {},
    className,
    inputclassName,
    error = false,
    eventGetCode = "onChange",
    inputErrorColor = "border-red-600"
}: Props) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

    const handleOnchangeOTP = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;

        // Next sang số tiếp theo
        if (e.target.value && e.target.nextSibling) {
            (e.target.nextSibling as HTMLInputElement).focus();
            onnextSibling();
        }
        // Chuyển về số trước khi người dùng xóa
        else if (!e.target.value && e.target.previousSibling) {
            (e.target.previousSibling as HTMLInputElement).focus();
            onpreviousSibling();
        }

        setOtp(newOtp);
        if (eventGetCode === "onChange" && newOtp.every((value) => value.length === 1)) onConpleteOTP(newOtp.join(""));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // Kiểm tra xem tất cả các ô đã được điền hay chưa
            if (otp.every((value) => value.length === 1)) {
                onConpleteOTP(otp.join(""));
            }
        }
    };

    return (
        <div className={clsx("flex gap-2", className)}>
            {otp.map((_, index) => (
                <input
                    key={index}
                    type="text"
                    className={clsx(
                        "size-10 rounded border p-2 text-center outline-none focus:border-[#295779]",
                        inputclassName,
                        error && inputErrorColor
                    )}
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => {
                        // Ngăn người dùng nhập chữ
                        if (e.target.value.match(/[a-zA-Z]/)) return;
                        handleOnchangeOTP(e, index);
                    }}
                    onKeyDown={(e) => {
                        if (eventGetCode === "onEnter") handleKeyDown(e);
                    }}
                />
            ))}
        </div>
    );
}
