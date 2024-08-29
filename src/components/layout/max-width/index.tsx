import clsx from "clsx";

export default function MaxWidth({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={clsx("mx-auto max-w-screen-xl h-full ", className)}>{children}</div>;
}
