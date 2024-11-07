import { RouterHandler } from "../router.handler";

export const revalidate = 0;
export async function GET() {
    return RouterHandler({
        async mainFc(pool) {
            console.log("Cron job!", new Date());

            return {
                message: "Test cron job!",
                data: []
            };
        }
    });
}
