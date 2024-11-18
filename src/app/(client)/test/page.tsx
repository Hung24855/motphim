"use client";
import useGetAllSearchParams from "@/base/hooks/useGetAllSearchParams";
import Select, { Option } from "@/base/libs/select";
import MaxWidth from "@/components/layout/max-width";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TestCrawl() {
    const allSearchParams = useGetAllSearchParams();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathName = usePathname();

    const [data, setData] = useState<string>("");
    const addSearchParams = (key: string, value: any) => {
        const params = new URLSearchParams(searchParams);
        const entries = Object.entries(allSearchParams);
        for (const [key, value] of entries) {
            params.set(key, value);
        }
        params.set(key, value);
        replace(`${pathName}?${params.toString()}`);
    };
    return (
        <MaxWidth className="flex min-h-screen flex-col items-center justify-center pt-20">
            <Select placeholder="Chọn thể loại" onChange={setData}>
                <Option
                    optionClick={(value) => {
                        addSearchParams("type", "phim-bo");
                    }}
                >
                    Phim bộ
                </Option>
                <Option
                    optionClick={(value) => {
                        addSearchParams("type2", "phim-le");
                    }}
                >
                    Phim lẻ
                </Option>
            </Select>
        </MaxWidth>
    );
}
