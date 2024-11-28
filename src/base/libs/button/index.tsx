import clsx from "clsx";
import { HTMLAttributes } from "react";

type ButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
    sizeSpin?: "small" | "default" | "large";
    buttonClassName?: HTMLAttributes<HTMLButtonElement>["className"];
    onClick?: (e: any) => void;
    type?: "button" | "submit" | "reset";
    block?: boolean;
    disabled?: boolean;
    [key: string]: any;
};
export default function Button({
    children,
    loading,
    buttonClassName,
    onClick,
    sizeSpin = "default",
    type = "button",
    block,
    disabled = false,
    ...rest
}: ButtonProps) {
    return (
        <button
            type={type}
            className={clsx(
                "flex cursor-pointer items-center justify-center gap-x-2 rounded bg-[#295779] p-2 text-white",
                buttonClassName,
                loading && "opacity-80",
                block && "w-full",
                disabled && "cursor-not-allowed opacity-80"
            )}
            onClick={onClick}
            disabled={loading || disabled}
            {...rest}
        >
            {loading && (
                <div
                    className={clsx(
                        "animate-spin rounded-full border border-white border-t-transparent",
                        sizeSpin === "small" && "size-3",
                        sizeSpin === "default" && "size-4",
                        sizeSpin === "large" && "size-6"
                    )}
                ></div>
            )}
            {children}
        </button>
    );
}
