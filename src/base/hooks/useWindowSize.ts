import { useState, useEffect } from "react";

type UseWindowSizeHook = {
    screenSize: "small" | "medium" | "large" | "extra large";
};

const useWindowSize = (): UseWindowSizeHook => {
    const [windowSize, setWindowSize] = useState<UseWindowSizeHook>({
        screenSize: "extra large"
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let screenSize: UseWindowSizeHook["screenSize"] = "extra large";

            if (width < 480) {
                screenSize = "small";
            } else if (width < 768) {
                screenSize = "medium";
            } else if (width < 1024) {
                screenSize = "large";
            } else {
                screenSize = "extra large";
            }

            setWindowSize({ screenSize });
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;


// const { screenSize } = useWindowSize();