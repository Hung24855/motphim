export type SideBarList = {
    name: string;
    icon?: JSX.Element;
    path?: string;
    subMenu?: SideBarList[];
};
