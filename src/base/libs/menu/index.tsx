import clsx from "clsx";
import React, { HTMLAttributes, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export interface MenuItem {
    label: string;
    icon?: JSX.Element;
    subMenu?: MenuItem[];
    onClick?: () => void;
}

interface MenuProps {
    menuItems: MenuItem[];
    menuContainerClassName?: HTMLAttributes<HTMLDivElement>["className"];
    menuItemClassName?: HTMLAttributes<HTMLDivElement>["className"];
    bgMenuColorClassName?: HTMLAttributes<HTMLDivElement>["className"];
    hoverCorlorItemClassName?: HTMLAttributes<HTMLElement>["className"];
}

const Menu: React.FC<MenuProps> = ({
    menuItems,
    menuContainerClassName,
    menuItemClassName,
    bgMenuColorClassName,
    hoverCorlorItemClassName
}) => {
    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const toggleSubMenu = (menu: string) => {
        if (openMenus.includes(menu)) {
            // Nếu menu đã mở, loại bỏ nó khỏi danh sách
            setOpenMenus(openMenus.filter((m) => m !== menu));
        } else {
            // Nếu menu chưa mở, thêm nó vào danh sách
            setOpenMenus([...openMenus, menu]);
        }
    };

    return (
        <div className={clsx("h-full w-64 text-white", menuContainerClassName, bgMenuColorClassName ?? "bg-gray-800")}>
            <ul className="space-y-2 p-2">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <div
                            className={clsx(
                                "flex cursor-pointer select-none items-center justify-between rounded p-2",
                                hoverCorlorItemClassName ?? "hover:bg-gray-700",
                                menuItemClassName
                            )}
                            onClick={() => {
                                if (item.subMenu) {
                                    toggleSubMenu(item.label);
                                }
                                if (item.onClick) {
                                    item.onClick();
                                }
                            }}
                        >
                            <span className="flex items-center gap-x-2">
                                {item.icon} {item.label}
                            </span>
                            {item.subMenu && (
                                <span className="ml-2">
                                    {openMenus.includes(item.label) ? (
                                        <IoIosArrowForward className="rotate-90 duration-200" />
                                    ) : (
                                        <IoIosArrowForward className="rotate-0 duration-200" />
                                    )}
                                </span>
                            )}
                        </div>
                        {item.subMenu && (
                            <ul
                                className={clsx(
                                    "overflow-hidden pl-6 transition-all duration-300",
                                    openMenus.includes(item.label) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                {item.subMenu.map((subItem, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className={clsx(
                                            "flex cursor-pointer select-none items-center gap-x-2 rounded p-2 hover:bg-gray-700",
                                            hoverCorlorItemClassName ?? "hover:bg-gray-700",
                                            menuItemClassName
                                        )}
                                        onClick={subItem.onClick}
                                    >
                                        {subItem.icon}
                                        {subItem.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;

// Ví dụ :
// const menuItems: MenuItem[] = [
//     {
//         label: "Dashboard",
//         subMenu: [
//             { label: "Cấp quyền", onClick: () => console.log("Cấp quyền clicked") },
//             {
//                 label: "Thống kê",
//                 onClick: () => console.log("Thống kê clicked")
//             }
//         ]
//     },
//     {
//         label: "Phân loại",
//         subMenu: [
//             { label: "Quốc gia", onClick: () => console.log("Quốc gia clicked") },
//             {
//                 label: "Thể loại",
//                 onClick: () => console.log("Thể loại clicked")
//             }
//         ]
//     },
//     {
//         label: "Đăng xất",
//         onClick: () => console.log("Đăng xuất clicked"),
//         icon: <FaArrowRightFromBracket />
//     }
// ];
// <Menu menuItems={menuItems} />
