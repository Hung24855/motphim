import { status } from "./status";

export const response_error = (message: string) => ({
    status: status.error,
    message: message,
    data: []
});

export const response_required = (message: string) => ({
    status: status.error,
    message: message ?? "Vui lòng điền đẩy đủ thông tin",
    data: []
});

export const response_authen_error = (message: string) => ({
    status: status.error,
    message: message ?? "Lỗi xác thực",
    data: []
});
