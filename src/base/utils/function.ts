import REGEX from "./regex";

export function isEmail(email: string) {
    return REGEX.email.test(email);
}
// Bỏ dấu khỏi từ tiếng việt
export function removeMark(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
// Convert thời gian
export function convertTime(inputTime: string): string {
    const now: Date = new Date();
    const pastTime: Date = new Date(inputTime);

    // Kiểm tra tính hợp lệ của inputTime
    if (!(pastTime instanceof Date) || isNaN(pastTime.getTime())) {
        return "";
    }

    // Tính khoảng cách thời gian giữa thời điểm hiện tại và thời điểm đầu vào
    const diffInSeconds: number = Math.abs(Math.floor((now.getTime() - pastTime.getTime()) / 1000));

    // Tính toán các khoảng thời gian
    const days: number = Math.floor(diffInSeconds / 86400);
    const hours: number = Math.floor(diffInSeconds / 3600) % 24;
    const minutes: number = Math.floor(diffInSeconds / 60) % 60;
    const seconds: number = diffInSeconds % 60;

    // Nếu thời gian lớn hơn 1 ngày, chỉ trả về chuỗi ngày
    if (days > 0) {
        return `${days} ngày trước`;
    }

    // Nếu thời gian lớn hơn 1 giờ, chỉ trả về chuỗi giờ
    if (hours > 0) {
        return `${hours} giờ trước`;
    }

    // Nếu thời gian lớn hơn 1 phút, chỉ trả về chuỗi phút
    if (minutes > 0) {
        return `${minutes} phút trước`;
    }

    // Nếu thời gian nhỏ hơn 30 giây, trả về "vài giây trước"
    if (seconds < 30) {
        return "vài giây trước";
    }

    // Nếu thời gian từ 30 giây trở lên, trả về số giây
    return `${seconds} giây trước`;
}

export const delay = (m: number) => new Promise((r) => setTimeout(r, m));
export function isWindow() {
    return typeof window !== "undefined";
}
export function saveToLocalStorage({ key, value }: { key: string; value: any }) {
    try {
        if (!isWindow()) return;
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(key, jsonValue);
    } catch (error) {
        console.error("Lỗi khi lưu vào localStorage:", error);
    }
}
export function getDataLocalStorage(key: string) {
    try {
        if (!isWindow()) return;
        const jsonValue = localStorage.getItem(key);
        return jsonValue ? JSON.parse(jsonValue) : null; // Chuyển đổi chuỗi JSON trở lại thành giá trị
    } catch (error) {
        console.error("Lỗi khi lấy từ localStorage:", error);
        return null; // Trả về null trong trường hợp có lỗi
    }
}
export function removeDataLocalStorage(key: string) {
    if (!isWindow()) return;
    localStorage.removeItem(key);
}
export function removeDuplicatesOfArray(array: any[]) {
    return [...new Set(array)];
}

export function removeLettersAndSpaces(str: string) {
    return str.replace(/[^\d]/g, ""); // Loại bỏ tất cả các ký tự không phải số
}
export function removeNullAndUndefinedFromObject({
    obj,
    allowNull = false
}: {
    obj: Record<string, any>;
    allowNull: boolean;
}): Record<string, any> {
    const result: Record<string, any> = {};

    for (let key in obj) {
        if (obj[key] !== undefined && (allowNull || obj[key] !== null)) {
            result[key] = obj[key];
        }
    }

    return result;
}

export function removeNullAndUndefinedFromArray({ arr, allowNull = false }: { arr: any[]; allowNull: boolean }): any[] {
    return arr.filter((item) => item !== undefined && (allowNull || item !== null));
}

export function generateRandomCode() {
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0 đến 9
    }
    return code;
}
