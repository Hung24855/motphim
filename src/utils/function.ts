export const convertSearchParams = (text: string) => {
    return text.replace(/\s+/g, "-");
};

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