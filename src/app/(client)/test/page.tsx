"use client";

import Button from "@/base/libs/button";
import MaxWidth from "@/components/layout/max-width";
import { requestPermission } from "@/firebase";
import { toast } from "react-toastify";

export default function TestModal() {
    const handleClick = () => {
        requestPermission({
            onGranted: (currentToken) => {
                console.log("currentToken", currentToken);
            },
            onDenied: () => {
                toast.warning("Yêu cầu quyền thông báo đã bị từ chối");
            },
            onDefault: () => {
                toast.warning("Yêu cầu quyền thông báo đã bị từ chối");
            }
        });
    };
    return (
        <MaxWidth className="flex min-h-screen flex-col items-center justify-center pt-20 text-white">
            <Button onClick={handleClick}>Bật thông báo</Button>
        </MaxWidth>
    );
}
