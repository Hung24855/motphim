import { status } from "./status";

// errorHandler.ts
export function Exception(error: unknown) {
    if (error instanceof Error) {
        console.log("Exception:", error.message);
        return {
            status: status.error,
            message: error.message,
            data: []
        };
    } else {
        console.log("Exception Unknown:", error);
        return {
            status: status.error,
            message: "Unknown error occurred",
            data: []
        };
    }
}
