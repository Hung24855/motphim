"use client";
import { useEffect, useRef } from "react";
import MaxWidth from "@/components/layout/max-width";


export default function TestModal() {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // useEffect(() => {
    //     const contentWindow = iframeRef.current?.contentWindow;
    //     const video = contentWindow?.document.querySelector("video");
    //     video?.play();
    // }, [iframeRef]);

    return (
        <MaxWidth className="flex min-h-screen flex-col pt-20 text-white">
            <iframe
                ref={iframeRef}
                src="https://vip.opstream17.com/share/a9c154c4658d7fc48fd2be3ef34d9109"
                className="z-20 aspect-video w-full overflow-hidden rounded-md bg-stone-900"
                allowFullScreen
                referrerPolicy="no-referrer"
                loading="lazy"
            />
        </MaxWidth>
    );
}
