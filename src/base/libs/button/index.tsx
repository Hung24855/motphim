import clsx from "clsx";

type ButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
    sizeSpin?: "small" | "default" | "large";
    buttonClssName?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    block?: boolean;
};
export default function Button({
    children,
    loading,
    buttonClssName,
    onClick,
    sizeSpin = "default",
    type = "button",
    block
}: ButtonProps) {
    return (
        <button
            type={type}
            className={clsx(
                "flex items-center justify-center gap-x-2 rounded bg-[#295779] p-2 text-white cursor-pointer",
                buttonClssName,
                loading && "opacity-80",
                block && "w-full"
            )}
            onClick={onClick}
            disabled={loading}
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
