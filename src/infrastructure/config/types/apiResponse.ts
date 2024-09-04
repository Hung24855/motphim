export type ISuccessResponse<T = any> = {
    status: "success";
    data: T;
    message: string;
};

export type IFailResponse<T = any> = {
    status: "error";
    data: T;
    message: string;
};

export type IResponseData = ISuccessResponse | IFailResponse;