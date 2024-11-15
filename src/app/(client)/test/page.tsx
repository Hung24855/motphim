"use client";
import Select, { Option } from "@/base/libs/select";
import MaxWidth from "@/components/layout/max-width";
import { useState } from "react";

export default function TestCrawl() {
    const [items, setItems] = useState(
        Array(3)
            .fill(0)
            .map((_, index) => ({
                id: index + 1,
                name: `Person ${index + 1}`,
                age: 20 + index * 5
            }))
    );

    const [data, setData] = useState<string>("");
    return (
        <MaxWidth className="flex min-h-screen flex-col items-center justify-center pt-20">
            <Select placeholder="Chọn thể loại" onChange={setData}>
                <Option>Phim bộ</Option>
                <Option>Phim lẻ</Option>
            </Select>
        </MaxWidth>
    );
}
