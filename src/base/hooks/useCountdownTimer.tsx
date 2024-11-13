import { useEffect, useState } from "react";

export const useCountdownTimer = (seconds: number = 60) => {
    const [remainingTime, setRemainingTime] = useState(() => {
        if (typeof window === "undefined") {
            return seconds;
        }

        const savedEndTime = localStorage.getItem("countdownEndTime");
        const currentTime = Date.now();
        if (savedEndTime) {
            const timeLeft = Math.floor((parseInt(savedEndTime, 10) - currentTime) / 1000);
            return timeLeft > 0 ? timeLeft : 0;
        }

        return seconds;
    });

    useEffect(() => {
        if (remainingTime <= 0) return;

        const endTime = Date.now() + remainingTime * 1000;
        if (typeof window !== "undefined") {
            localStorage.setItem("countdownEndTime", endTime.toString());
        }

        const intervalId = setInterval(() => {
            const currentTime = Date.now();
            const timeLeft = Math.floor((endTime - currentTime) / 1000);
            setRemainingTime(timeLeft > 0 ? timeLeft : 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [remainingTime]);

    const start = () => setRemainingTime(seconds);

    return { remainingTime, start };
};
