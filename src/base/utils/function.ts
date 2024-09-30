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

// Convert thười gian
export function convertTime(inputTime: string): string {
    const now: Date = new Date();
    const pastTime: Date = new Date(inputTime);
    const diffInSeconds: number = Math.floor((now.getTime() - pastTime.getTime()) / 1000); // Khoảng cách thời gian tính bằng giây

    // Tính toán các khoảng thời gian
    const seconds: number = diffInSeconds % 60;
    const minutes: number = Math.floor(diffInSeconds / 60) % 60;
    const hours: number = Math.floor(diffInSeconds / 3600) % 24;
    const days: number = Math.floor(diffInSeconds / 86400);

    // Tạo chuỗi kết quả
    let result: string = "";

    if (days > 0) {
        result += `${days} ngày `;
    }

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
