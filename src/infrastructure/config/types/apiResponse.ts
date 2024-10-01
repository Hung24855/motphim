export type ISuccessResponse<T = any> = {
    status: "success";
    data: T;
    message: string;
    pagination?: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
};

export type IFailResponse<T = any> = {
    status: "error";
    data: T;
    message: string;
    pagination?: {
        totalRows: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
};

export type IResponseData = ISuccessResponse | IFailResponse;
