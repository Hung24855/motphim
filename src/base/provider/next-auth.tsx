"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { createContext } from "react";

export const sessionContext = createContext({ session: null, isLoggedIn: false } as {
    session: Session | null;
    isLoggedIn: boolean;
});
export default function NextAuthProvider({
    children,
    session
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    return (
        <sessionContext.Provider value={{ session, isLoggedIn: !!session }}>
            <SessionProvider session={session}> {children} </SessionProvider>
        </sessionContext.Provider>
    );
}
