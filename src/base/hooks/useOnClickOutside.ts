import { RefObject, useEffect } from "react";

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: (evt: MouseEvent | TouchEvent) => any) => {
    useEffect(() => {
        const listener = (evt: MouseEvent | TouchEvent) => {
            if (!ref.current || !(evt.target instanceof Node) || ref.current.contains(evt.target)) {
                return;
            }

            handler(evt);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchend", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchend", listener);
        };
        // Thêm ref và handler vào dependencies
        // Cần lưu ý rằng vì handler được truyền vào là một hàm mới ...
        // ... trên mọi render sẽ gây ra hiệu ứng này ...
        // ... callback/cleanup để chạy mọi render. Không phải là vấn đề lớn ...
        // ... nhưng để tối ưu hóa, bạn có thể gói handler trong useCallback trước khi ...
        // ... truyền nó vào hook này.
    }, [ref, handler]);
};
