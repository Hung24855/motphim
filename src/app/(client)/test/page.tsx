"use client";
import { useCountdownTimer } from "@/base/hooks/useCountdownTimer";
import Button from "@/base/libs/button";
import MaxWidth from "@/components/layout/max-width";

export default function TestGlobalState() {
    const { remainingTime, start } = useCountdownTimer(60, "test");

    return (
        <MaxWidth className="flex min-h-screen flex-col items-center justify-center pt-20 text-white">
            <div>{remainingTime}</div>
            <Button onClick={start}>start</Button>
        </MaxWidth>
    );
}
