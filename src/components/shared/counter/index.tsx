import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

export default function Counter({ number }: { number: number | string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, Number(number), { duration: 1 });
        return () => controls.stop();
    }, [number]);
    return <motion.span>{rounded}</motion.span>;
}
