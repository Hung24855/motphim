import { status } from "./status";

export const responseError = {
    status: status.error,
    message: "Có lỗi xảy ra",
    data: []
};

export const responseRequired = {
    status: status.error,
    message: "Vui lòng điền đẩy đủ thông tin",
    data: []
};


export const responseAuthenError = {
    status: status.error,
    message: "Lỗi xác thực",
    data: []
};
