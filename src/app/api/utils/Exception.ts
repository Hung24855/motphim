import { status } from "./status";

// errorHandler.ts
export function Exception(error: unknown) {
    if (error instanceof Error) {
        console.log("Error message:", error.message);
        return {
            status: status.error,
            message: error.message,
            data: []
        };
    } else {
        console.log("Unknown error:", error);
        return {
            status: status.error,
            message: "Unknown error occurred",
            data: []
        };
    }
}
