import clsx from "clsx";
import "./uiverse.io.css";
import { ReactNode } from "react";

type LoadingProps = {
    children?: ReactNode;
    allowFullScreen?: boolean;
    backgroundOverlayClassName?: string;
    loading: boolean;
    containerClassName?: string;
};
export default function Loading({
    allowFullScreen,
    backgroundOverlayClassName,
    children,
    loading,
    containerClassName
}: LoadingProps) {
    return (
        <div
            className={clsx(
                "relative",
                allowFullScreen && "fixed inset-0",
                backgroundOverlayClassName,
                children ? "" : "h-full w-full"
            )}
        >
            {loading && (
                <div className={clsx("absolute inset-0 flex items-center justify-center", containerClassName)}>
                    <div className={clsx("loader-uiverse")}></div>
                </div>
            )}
            {children}
        </div>
    );
}
