import REGEX from "./regex";

export function handleSortSlide(arr: any[], index: number) {
    // const arr = [0, 1, 2, 3, 4]; // 3=> [1,2,3,4,0] 4=>[2,3,4,0,1] 1=>[4,0,1,2,3] 0=>[3,4,0,1,2]
    // Chức năng : Dịch chuyển vị trị các phần tử trong slide
    const middle = Math.floor(arr.length / 2); //Index trung tâm
    const space = Math.abs(index - middle); //Khoảng cách tử index đến trung tâm
    if (index > middle) {
        const a = arr.splice(0, space);
        arr.push(...a);
    }
    if (index < middle) {
        const a = arr.splice(-space);
        arr.unshift(...a);
    }

    if (index === middle) return;
}

export function isEmail(email: string) {
    return REGEX.email.test(email);
}
// Bỏ dấu khỏi từ tiếng việt
export function removeMark(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Convert thời gian
export function convertTime(inputTime: string): string {
    const now: Date = new Date();
    const pastTime: Date = new Date(inputTime);
    const diffInSeconds: number = Math.floor((now.getTime() - pastTime.getTime()) / 1000); // Khoảng cách thời gian tính bằng giây

    // Tính toán các khoảng thời gian
    const days: number = Math.floor(diffInSeconds / 86400);
    const hours: number = Math.floor(diffInSeconds / 3600) % 24;
    const minutes: number = Math.floor(diffInSeconds / 60) % 60;
    const seconds: number = diffInSeconds % 60;

    // Nếu thời gian lớn hơn 1 ngày, chỉ trả về chuỗi ngày
    if (days > 0) {
        return `${days} ngày trước`;
    }

    // Tạo chuỗi kết quả cho giờ, phút, giây nếu < 1 ngày
    let result: string = "";

    if (hours > 0) {
        result += `${hours} giờ `;
    }

    if (minutes > 0) {
        result += `${minutes} phút `;
    }

    if (seconds > 0 && result === "") {
        result = `${seconds} giây `;
    }

    return result.trim() + " trước";
}

export const delay = (m: number) => new Promise((r) => setTimeout(r, m));

export function checkNullOrUndefinedInObject(obj: Record<string, any>): boolean {
    for (let key in obj) {
        if (obj[key] === null || obj[key] === undefined) {
            return true;
        }
    }
    return false;
}

// remove all undefined or null value in object, if allowNull = true, object is not remove null value.
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
// remove all undefined or null value in array, if allowNull = true, array is not remove null value.
export function removeNullAndUndefinedFromArray({ arr, allowNull = false }: { arr: any[]; allowNull: boolean }): any[] {
    return arr.filter((item) => item !== undefined && (allowNull || item !== null));
}
