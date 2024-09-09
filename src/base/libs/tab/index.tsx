import clsx from "clsx";
import React, { useState, ReactNode } from "react";

interface Tab {
    label: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    className?: string;
    contentClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, className, contentClassName }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="min-w-max">
            <div className="tabs flex w-full">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={clsx(
                            "px-4 py-2",
                            {
                                "active rounded-tl-md rounded-tr-md border border-blue-200 border-b-transparent bg-white":
                                    activeTab === index,
                                "border-b-[1px] border-b-blue-200": activeTab !== index
                            },
                            className
                        )}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
                <div className="flex-1 border-b-[1px] border-b-blue-200"></div>
            </div>

            <div
                className={clsx(
                    "tab-content border border-blue-200 border-t-transparent bg-white px-4 py-2",
                    contentClassName
                )}
            >
                {tabs.map((tab, index) => (
                    <div key={index} className={clsx({ hidden: activeTab !== index }, contentClassName)}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
