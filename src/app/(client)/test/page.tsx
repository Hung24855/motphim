"use client";
import Button from "@/base/libs/button";
import Modal, { ModalRef } from "@/base/libs/modal/modal-ref";
import MaxWidth from "@/components/layout/max-width";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useRef } from "react";

export default function TestModal() {
    const pathName = usePathname();
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const modalRef = useRef<ModalRef>(null);

    return (
        <Fragment>
            <MaxWidth className="flex min-h-screen items-center pt-40">
                <Button
                    onClick={() => {
                        if (modalRef.current) {
                            modalRef.current.open();
                        }
                    }}
                >
                    Open modal
                </Button>

                <Modal
                    ref={modalRef}
                    onClose={() => {
                        if (modalRef.current) {
                            modalRef.current.close();
                        }
                    }}
                    onOk={() => {}}
                    modalContainerClassName="w-1/4 "
                >
                    Test modal ref
                </Modal>
            </MaxWidth>

            <MaxWidth>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        if (ref.current) {
                            ref.current.scrollIntoView({
                                behavior: "smooth"
                            });
                        }
                    }}
                >
                    Test scroll
                </Button>

                <div className="h-screen bg-red-400"></div>
                <div className="h-screen bg-blue-200" ref={ref} id="testscroll"></div>
            </MaxWidth>
        </Fragment>
    );
}
