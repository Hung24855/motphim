"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { createContext } from "react";

export const sessionContext = createContext({} as { session: Session | null });
export default function NextAuthProvider({
    children,
    session
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return (
        <sessionContext.Provider value={{ session }}>
            <SessionProvider session={session}> {children} </SessionProvider>
        </sessionContext.Provider>
    );
}
