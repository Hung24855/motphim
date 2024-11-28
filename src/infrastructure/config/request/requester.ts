import http from ".";
import { IResponseData, ISuccessResponse } from "../types/apiResponse";

interface RequesterOptions<Model> {
    requestFunc?: (url: string) => Promise<{ data: IResponseData }>;
    boundedTime?: number;
    handleData?: (data: ISuccessResponse) => Model;
}
export const requester =
    <Model>({
        requestFunc = (url = "") => http.get(url),
        handleData = (data: ISuccessResponse) => data as Model
    }: RequesterOptions<Model> = {}) =>
    async (url = "") => {
        try {
            const { data } = await requestFunc(url);

            if (data?.status === "success") return await handleData(data as ISuccessResponse);
            else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    };
