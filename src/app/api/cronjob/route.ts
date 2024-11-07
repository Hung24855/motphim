import { RouterHandler } from "../router.handler";
export async function GET() {
    return RouterHandler({
        async mainFc(pool) {
            console.log("Cron job running at ", new Date());

            return {
                message: "Cron job running at " + new Date(),
                data: []
            };
        }
    });
}
