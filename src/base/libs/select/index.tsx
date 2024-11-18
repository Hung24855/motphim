import React, { HTMLProps } from "react";
import CSS from "csstype";
import clsx from "clsx";
import { IoMdArrowDropdown } from "react-icons/io";
import { useOnClickOutside } from "@/base/hooks/useOnClickOutside";

type ISelectProps = {
    placeholder?: string;
    children: React.ReactNode;
    selectClassName?: HTMLProps<HTMLDivElement>["className"];
    transitionType?: "zoomIn" | "scaleY" | "slideDown";
    transitionProperty?: Pick<CSS.Properties, "transformOrigin" | "transitionDuration" | "transitionTimingFunction">;
    optionContainerStyle?: Pick<CSS.Properties, "top" | "left" | "right" | "backgroundColor">;
    onChange?: (value: string) => void;
    scrollbar?: boolean;
};

export default function Select({
    placeholder = "Vui lòng chọn",
    children,
    selectClassName,
    transitionType = "scaleY",
    transitionProperty,
    optionContainerStyle = {
        top: "110%",
        left: "auto",
        right: "auto",
        backgroundColor: "#fff"
    },
    onChange,
    scrollbar = true
}: ISelectProps) {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
    const selectRef = React.useRef<HTMLDivElement>(null);
    useOnClickOutside(selectRef, () => setIsVisible(false));

    function transformConverter(): CSS.Properties["transform"] | undefined {
        switch (transitionType) {
            case "zoomIn":
                return isVisible ? "scale(1)" : "scale(0.9)";

            case "scaleY":
                return isVisible ? "scaleY(1)" : "scaleY(0)";

            case "slideDown":
                return isVisible ? "translateY(0)" : "translateY(-10px)";

            default:
                return undefined;
        }
    }

    const handleOptionClick = (value: string) => {
        setSelectedValue(value);
        setIsVisible(false);
        if (onChange) onChange(value);
    };

    return (
        <div
            className={clsx(
                "relative h-10 min-w-40 cursor-pointer select-none rounded border bg-white px-2",
                selectClassName
            )}
            onClick={() => setIsVisible(!isVisible)}
            ref={selectRef}
        >
            <div className="flex h-full items-center justify-between">
                {selectedValue || placeholder}{" "}
                <IoMdArrowDropdown
                    size={18}
                    style={{
                        transform: `rotate(${isVisible ? "180deg" : "0"})`,
                        transitionDuration: transitionProperty?.transitionDuration || "300ms"
                    }}
                />
            </div>
            <div
                className={clsx(
                    "absolute left-0 z-50 max-h-32 w-full overflow-hidden overflow-y-auto rounded-b border shadow",
                    scrollbar ? "scrollbar-custom" : "scrollbar-none"
                )}
                style={{
                    opacity: isVisible ? "1" : "0",
                    transitionDuration: transitionProperty?.transitionDuration || "300ms",
                    transitionTimingFunction: transitionProperty?.transitionTimingFunction || "ease-in-out",
                    transformOrigin: transitionProperty?.transformOrigin || "top",
                    visibility: isVisible ? "visible" : "hidden",
                    transform: transformConverter(),
                    top: optionContainerStyle?.top || "110%",
                    backgroundColor: optionContainerStyle?.backgroundColor || "#fff"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {React.Children.map(children, (child) => {
                    return React.isValidElement(child)
                        ? React.cloneElement(child, { onClick: handleOptionClick } as any)
                        : child;
                })}
            </div>
        </div>
    );
}

type IOptionProps = {
    children: React.ReactNode;
    selectItemClassName?: HTMLProps<HTMLDivElement>["className"];
    onClick?: (value: string) => void;
    optionClick?: (value: string) => void;
};

export function Option({ children, selectItemClassName, onClick, optionClick }: IOptionProps) {
    const handleClick = () => {
        //Không dùng prop này . Prop này chỉ dùng để Component Select lấy giá trị của option.
        if (onClick) {
            if (typeof children === "string") {
                onClick(children);
            }
        }
        //Muốn xử lý OnClick thì dùng prop này
        if (optionClick)
            if (typeof children === "string") {
                optionClick(children);
            }
    };

    return (
        <div className={clsx("h-8 px-2 leading-8 hover:bg-[#dee0e1]", selectItemClassName)} onClick={handleClick}>
            {children}
        </div>
    );
}

//VD
{
    /* <Select placeholder="Chọn thể loại" onChange={(value)=>{}}>
    <Option>Phim bộ</Option>
    <Option>Phim lẻ</Option>
</Select>; */
}
