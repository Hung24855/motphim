"use client";

import MaxWidth from "@/components/layout/max-width";
import { Fragment } from "react";

export default function TestModal() {
    return (
        <Fragment>
            <MaxWidth className="flex min-h-screen flex-col pt-20 text-white">
                <div className="h-[50px]">Header</div>
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Side */}
                    <div className="w-2/3 overflow-y-auto bg-gray-800">Trái</div>

                    {/* Right Side */}
                    <div className="flex w-1/3 flex-col">
                        {/* Content Section */}
                        <div className="h-[calc(100vh-180px)] overflow-hidden overflow-y-auto">
                            <div className="p-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore incidunt quod
                                sunt facilis rem? Fugiat voluptatibus ad, aut illo eius, veritatis deserunt distinctio
                                porro dolores, pariatur aperiam error iste. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam dolore incidunt quod sunt facilis rem? Fugiat voluptatibus ad,
                                aut illo eius, veritatis deserunt distinctio porro dolores, pariatur aperiam error iste.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore incidunt quod
                                sunt facilis rem? Fugiat voluptatibus ad, aut illo eius, veritatis deserunt distinctio
                                porro dolores, pariatur aperiam error iste. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam dolore incidunt quod sunt facilis rem? Fugiat voluptatibus ad,
                                aut illo eius, veritatis deserunt distinctio porro dolores, pariatur aperiam error iste.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore incidunt quod
                                sunt facilis rem? Fugiat voluptatibus ad, aut illo eius, veritatis deserunt distinctio
                                porro dolores, pariatur aperiam error iste. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam dolore incidunt quod sunt facilis rem? Fugiat voluptatibus ad,
                                aut illo eius, veritatis deserunt distinctio porro dolores, pariatur aperiam error iste.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore incidunt quod
                                sunt facilis rem? Fugiat voluptatibus ad, aut illo eius, veritatis deserunt distinctio
                                porro dolores, pariatur aperiam error iste. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam dolore incidunt quod sunt facilis rem? Fugiat voluptatibus ad,
                                aut illo eius, veritatis deserunt distinctio porro dolores, pariatur aperiam error iste.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore incidunt quod
                                sunt facilis rem? Fugiat voluptatibus ad, aut illo eius, veritatis deserunt distinctio
                                porro dolores, pariatur aperiam error iste. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam dolore incidunt quod sunt facilis rem? Fugiat voluptatibus ad,
                                aut illo eius, veritatis deserunt distinctio porro dolores, pariatur aperiam error iste.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore incidunt quod
                                sunt facilis rem? Fugiat voluptatibus ad, aut illo eius, veritatis deserunt distinctio
                                porro dolores, pariatur aperiam error iste. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam dolore incidunt quod sunt facilis rem? Fugiat voluptatibus ad,
                                aut illo eius, veritatis deserunt distinctio porro dolores, pariatur aperiam error iste.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore incidunt quod
                                sunt facilis rem? Fugiat voluptatibus ad, aut illo eius, veritatis deserunt distinctio
                                porro dolores, pariatur aperiam error iste. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Aperiam dolore incidunt quod sunt facilis rem? Fugiat voluptatibus ad,
                                aut illo eius, veritatis deserunt distinctio porro dolores, pariatur aperiam error iste.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam dolore incidunt quod
                                sunt facilis rem? Fugiat voluptatibus ad, aut illo eius, veritatis deserunt distinctio
                                porro dolores, pariatur aperiam error iste.
                            </div>
                        </div>

                        {/* Input Section */}
                        <div className="h-[50px] overflow-x-auto whitespace-nowrap bg-gray-700">
                            <input
                                type="text"
                                className="h-full w-full bg-transparent px-4 outline-none"
                                placeholder="Type your message here..."
                            />
                        </div>
                    </div>
                </div>
            </MaxWidth>
        </Fragment>
    );
}
