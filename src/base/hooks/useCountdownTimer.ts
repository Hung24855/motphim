import { useCallback, useEffect, useState } from "react";

export const useCountdownTimer = (initSeconds: number, keyLocalStorage: string) => {
    const [remainingTime, SetRemainingTime] = useState(initSeconds);
    const [isClient, setIsClient] = useState(false);
    const [isStart, setIsStart] = useState(true);

    useEffect(() => {
        setIsClient(true); // Đánh dấu client-side đã sẵn sàng
    }, []);

    useEffect(() => {
        if (!isClient || !isStart) return;

        const savedEndTime = localStorage.getItem(keyLocalStorage);
        const now = Date.now();

        if (savedEndTime) {
            const timeLeft = Math.floor((parseInt(savedEndTime) - now) / 1000);
            SetRemainingTime(timeLeft > 0 ? timeLeft : 0);
        } else {
            localStorage.setItem(keyLocalStorage, (initSeconds * 1000 + now).toString());
        }

        const timerID = setInterval(() => {
            SetRemainingTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerID);
                    setIsStart(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerID);
    }, [isClient, isStart]);

    const start = useCallback(() => {
        if (!isClient) return;
        const newEndTime = Date.now() + initSeconds * 1000;
        localStorage.setItem(keyLocalStorage, newEndTime.toString());
        SetRemainingTime(initSeconds);
        setIsStart(true);
    }, [isClient]);

    return { remainingTime: isClient ? remainingTime : initSeconds, start };
};
