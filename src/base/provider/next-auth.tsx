"use client";
import { Session } from "next-auth";
import { createContext } from "react";

export const sessionContext = createContext({} as { session: Session | null });
export default function NextAuthProvider({
    children,
    session
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return <sessionContext.Provider value={{ session }}>{children}</sessionContext.Provider>;
}
