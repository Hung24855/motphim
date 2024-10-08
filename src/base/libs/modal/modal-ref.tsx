import clsx from "clsx";
import React, { forwardRef, Fragment, HTMLProps, useEffect, useImperativeHandle, useState } from "react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
    children: React.ReactNode;
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

export type ModalRef = {
    open: () => void;
    close: () => void;
};

// Chuyển Modal thành một component có thể nhận ref
export const Modal = forwardRef<ModalRef, ModalProps>(
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
            loading = false,
            sizeSpin = "default"
        }: ModalProps,
        ref
    ) => {
        const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

        const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation(); // Dừng sự kiện click không lan tới modal container
            onClose();
        };

        const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        };

        //Export 2 hàm open và close ra ngoài để component khác có thể gọi bằng ref
        useImperativeHandle(ref, () => {
            return {
                open: () => {
                    setIsOpenModal(true);
                },
                close: () => {
                    setIsOpenModal(false);
                }
            };
        });

        return (
            <Fragment>
                <div
                    className={clsx(
                        "fixed inset-0 z-50 duration-200 ease-in-out",
                        overlayBackgroundColor ? overlayBackgroundColor : "bg-black/25"
                    )}
                    onClick={handleOverlayClick}
                    style={{
                        display: isOpenModal ? "block" : "none"
                    }}
                ></div>
                <div
                    className={clsx(
                        "fixed left-1/2 top-60 z-50 flex max-w-[80vw] translate-x-[-50%] flex-col gap-y-2 rounded-lg bg-white p-3 shadow",
                        modalContainerClassName,
                        isOpenModal ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    )}
                    style={{
                        // transform: isOpenModal ? "scale(1)" : "scale(0)",
                        // opacity: isOpenModal ? 1 : 0,
                        transitionDuration: "250ms",
                        transitionTimingFunction: "ease-in-out"
                    }}
                    onClick={handleModalClick} // Ngăn chặn sự kiện click lan ra ngoài
                >
                    <div className="absolute right-1 top-1 rounded-full p-1 hover:bg-gray-200" onClick={onClose}>
                        <IoClose className="cursor-pointer" size={20} />
                    </div>
                    {textHeader && <div className={clsx("font-semibold", headerModalClassName)}>{textHeader}</div>}
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
                                "flex items-center gap-x-2 rounded bg-[#295779] px-2 py-1 text-white",
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
            </Fragment>
        );
    }
);

export default Modal;

// Cách dùng

// export default function TestModal() {
//     const modalRef = useRef<ModalRef>(null);
//     return (
//         <MaxWidth className="flex min-h-screen items-center justify-center pt-40">
//             <Button
//                 onClick={() => {
//                     if (modalRef.current) {
//                         modalRef.current.open();
//                     }
//                 }}
//             >
//                 Open modal
//             </Button>

//             <Modal
//                 ref={modalRef}
//                 onClose={() => {
//                     if (modalRef.current) {
//                         modalRef.current.close();
//                     }
//                 }}
//                 onOk={() => {}}
//                 modalContainerClassName="w-1/4 "
//             >
//                 Test modal ref
//             </Modal>
//         </MaxWidth>
//     );
// }
