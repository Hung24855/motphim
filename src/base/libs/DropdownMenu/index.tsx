import CSS from "csstype";
import { useOnClickOutside } from "@/base/hooks/useOnClickOutside";
import { HTMLProps, MouseEvent, ReactNode, useRef, useState } from "react";
import clsx from "clsx";

type DropDownProps = {
    toggleComponent: ReactNode;
    dropdownComponent: ReactNode;
    toggleEvent?: "click" | "hover";
    onClickToggleComponent?: (
        e: MouseEvent<HTMLDivElement>,
        isActive: boolean,
        setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;

    dropdownComponentStyle?: Pick<CSS.Properties, "top" | "left" | "right">;
    transitionProperty?: Pick<CSS.Properties, "transformOrigin" | "transitionDuration" | "transitionTimingFunction">;
    transitionType: "zoomIn" | "scaleY" | "slideDown";
    dropdownPositionClassName?: HTMLProps<HTMLDivElement>["className"];
    dropdownComponentClassName?: HTMLProps<HTMLDivElement>["className"];
    toggleComponentClassName?: HTMLProps<HTMLDivElement>["className"];
};

const DropdownMenu = ({
    toggleComponent,
    dropdownComponent,
    toggleEvent = "click",
    onClickToggleComponent,
    dropdownComponentStyle = {
        top: "120%",
        right: "auto",
        left: "auto"
    },
    transitionProperty = {
        transformOrigin: "top",
        transitionDuration: "100",
        transitionTimingFunction: "ease-in-out"
    },
    transitionType,
    dropdownPositionClassName,
    dropdownComponentClassName,
    toggleComponentClassName
}: DropDownProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, () => setIsActive(false));

    function transformConverter(): CSS.Properties["transform"] | undefined {
        switch (transitionType) {
            case "zoomIn":
                return isActive ? "scale(1)" : "scale(0.9)";

            case "scaleY":
                return isActive ? "scaleY(1)" : "scaleY(0)";

            case "slideDown":
                return isActive ? "translateY(0)" : "translateY(-10px)";

            default:
                return undefined;
        }
    }

    return (
        <div
            ref={modalRef}
            className="relative"
            onMouseEnter={() => {
                if (toggleEvent !== "hover") return;
                setIsActive(true);
            }}
            onMouseLeave={() => {
                if (toggleEvent !== "hover") return;
                setIsActive(false);
            }}
        >
            <div
                onClick={(e) => {
                    if (toggleEvent !== "click") return;
                    if (onClickToggleComponent) {
                        onClickToggleComponent(e, isActive, setIsActive);
                    } else {
                        setIsActive(!isActive);
                    }
                }}
                className={toggleComponentClassName}
            >
                {toggleComponent}
            </div>

            <div
                style={{
                    position: "absolute",
                    zIndex: 50,
                    top: dropdownComponentStyle.top ?? "120%",
                    // right: dropdownComponentStyle.right ?? "auto",
                    // left: dropdownComponentStyle.left ?? "auto",
                    transitionDuration: `${transitionProperty.transitionDuration ?? 100}ms`,
                    transitionTimingFunction: transitionProperty.transitionTimingFunction ?? "ease-in-out",
                    transformOrigin: transitionProperty.transformOrigin ?? "top",
                    transform: transformConverter(),
                    opacity: isActive ? "1" : "0",
                    visibility: isActive ? "visible" : "hidden"
                }}
                className={clsx(
                    dropdownPositionClassName ? dropdownPositionClassName : "left-auto right-0",
                    dropdownComponentClassName
                )}
            >
                {dropdownComponent}
            </div>
        </div>
    );
};

export default DropdownMenu;

{
    /* <DropdownMenu
    toggleComponent={
        <div className="flex cursor-pointer items-center">
            <Image
                src={userInfo.avatar ? userInfo.avatar : "/assets/images/user/userDefault1.png"}
                alt="avatar"
                width={100}
                height={100}
                className="h-[32px] w-[32px] rounded-full object-cover"
            />
            <ArrowDown className="ml-[6px]" />
        </div>
    }
    dropdownComponent={
        <div className="border-secondary rounded-md border-[0.5px]">
            <Link
                href={`/nguoi-dung/${userInfo.username}`}
                className="mob:hidden tabx:block lapx:hover:bg-secondary cursor-pointer rounded-tl-md rounded-tr-md bg-white px-4 py-2 text-black shadow-md"
            >
                Trang cá nhân
            </Link>
            <Link
                href={userInfo.access_token ? "/chinh-sua-thong-tin" : "/dang-nhap"}
                className="mob:hidden tabx:block"
            >
                <div className="lapx:hover:bg-secondary cursor-pointer bg-white px-4 py-2 text-black shadow-md">
                    Chỉnh sửa trang cá nhân
                </div>
            </Link>
            <Link href={"/de-thi-thpt-quoc-gia"} className="mob:hidden tabx:block">
                <div className="lapx:hover:bg-secondary cursor-pointer bg-white px-4 py-2 text-black shadow-md">
                    Đề thi THPTQG
                </div>
            </Link>
            <div
                className="lapx:hover:bg-secondary cursor-pointer bg-white px-4 py-2 text-black shadow-md"
                onClick={() => {
                    openModalDailyLogin();
                }}
            >
                Điểm danh nhận quà
            </div>
            <Link
                href={"/vi-cua-toi"}
                className="mob:hidden tabx:block lapx:hover:bg-secondary cursor-pointer bg-white px-4 py-2 text-black shadow-md"
            >
                Ví của tôi
            </Link>
            <div
                className="lapx:hover:bg-secondary cursor-pointer rounded-bl-md rounded-br-md bg-white px-4 py-2 text-black shadow-md"
                onClick={handleLogout}
            >
                Đăng xuất
            </div>
        </div>
    }
    dropdownComponentClassName="w-max"
    dropdownComponentStyle={{
        top: "120%"
    }}
    transitionProperty={{
        transformOrigin: "top",
        transitionDuration: "120"
    }}
    transitionType="scaleY"
    toggleEvent="click"
    dropdownPositionClassName="right-0"
/>; */
}
