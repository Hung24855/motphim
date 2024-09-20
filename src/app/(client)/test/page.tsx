"use client";
import Button from "@/base/libs/button";
import Modal, { ModalRef } from "@/base/libs/modal/modal-ref";
import MaxWidth from "@/components/layout/max-width";
import { useRef } from "react";

export default function TestModal() {
    const modalRef = useRef<ModalRef>(null);
    return (
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
    );
}
