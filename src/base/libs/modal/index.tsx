import clsx from "clsx";
import React, { forwardRef, Fragment, HTMLProps } from "react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onOk: () => void;
    onClose: () => void;
    onCancel?: () => void;
    textCancel?: string;
    textOk?: string;
    textHeader?: string;
    overlayBackgroundColor?: string;
    modalContainerClassName?: HTMLProps<HTMLDivElement>["className"];
    cancelButtonClassName?: HTMLProps<HTMLButtonElement>["className"];
    okButtonClassName?: HTMLProps<HTMLButtonElement>["className"];
    headerModalClassName?: HTMLProps<HTMLButtonElement>["className"];
    loading?: boolean;
    sizeSpin?: "small" | "default" | "large";
};

// Chuyển Modal thành một component có thể nhận ref
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
    (
        {
            children,
            textCancel = "Cancel",
            textOk = "OK",
            textHeader,
            onCancel,
            onOk,
            onClose,
            overlayBackgroundColor,
            modalContainerClassName,
            cancelButtonClassName,
            okButtonClassName,
            headerModalClassName,
            isOpen,
            loading = false,
            sizeSpin = "default"
        }: ModalProps,
        ref
    ) => {
        const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation(); // Dừng sự kiện click không lan tới modal container
            onClose();
        };

        const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        };

        return (
            <Fragment>
                {isOpen && (
                    <div
                        className={clsx(
                            "fixed inset-0 z-50 flex justify-center duration-200 ease-in-out",
                            overlayBackgroundColor ? overlayBackgroundColor : "bg-black/25"
                        )}
                        onClick={handleOverlayClick}
                    >
                        <div
                            ref={ref}
                            className={clsx(
                                "absolute top-60 flex max-w-[80vw] animate-zoom-in duration-100 flex-col gap-y-2 rounded-lg bg-white p-3 shadow",
                                modalContainerClassName
                            )}
                            onClick={handleModalClick} // Ngăn chặn sự kiện click lan ra ngoài
                        >
                            <div
                                className="absolute right-1 top-1 rounded-full p-1 hover:bg-gray-200"
                                onClick={onClose}
                            >
                                <IoClose className="cursor-pointer" size={20} />
                            </div>
                            {textHeader && (
                                <div className={clsx("font-semibold", headerModalClassName)}>{textHeader}</div>
                            )}
                            {/* Content */}
                            <div>{children}</div>
                            {/* Footer */}
                            <div className="flex justify-end gap-x-2">
                                <button
                                    type="button"
                                    className={clsx(
                                        "rounded border px-2 py-1 hover:border-red-500 hover:text-red-500",
                                        cancelButtonClassName
                                    )}
                                    onClick={onCancel ?? onClose}
                                >
                                    {textCancel}
                                </button>
                                <button
                                    type="button"
                                    className={clsx(
                                        "flex items-center gap-x-2 rounded bg-blue-500 px-2 py-1 text-white",
                                        okButtonClassName,
                                        loading && "opacity-80"
                                    )}
                                    onClick={onOk}
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
                                    {textOk}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
);

export default Modal;
