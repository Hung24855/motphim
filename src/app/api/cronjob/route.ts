import { RouterHandler } from "../router.handler";

export const revalidate = 0;
export async function GET() {
    return RouterHandler({
        async mainFc(pool) {
            console.log("Cron job executed!", new Date());

            return {
                message: "Cron job executed!" + new Date(),
                data: []
            };
        }
    });
}
