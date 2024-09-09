import Tabs from "@/base/libs/tab";
import { FieldValues } from "@/views/admin/movie/create/page";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface Props {
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>;
}

export default function MovieEpisodeList({}: Props) {
    const [Episodes, setEpisodes] = useState<Number[]>([1]);
    return (
        <div className="min-w-max">
            <button
                className="rounded bg-orange-400 px-3 py-2 text-white"
                onClick={() => setEpisodes([...Episodes, Episodes.length + 1])}
            >
                Thêm tập mới
            </button>

            <div className="mt-3">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Tên phim</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Slug</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Link phim</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Episodes.map((Episode, index) => (
                            <tr className="hover:bg-gray-50" key={index}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input type="text" defaultValue={`${Episode}`} className="p-1" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input type="text" defaultValue={`tap-${Episode}`} className="p-1" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input type="text" className="p-1" />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {index === Episodes.length - 1 && (
                                        <button
                                            className="rounded bg-red-600 px-2 text-white"
                                            onClick={() => {
                                                let NewEpisode = Episodes.filter((item) => item != Episode);
                                                setEpisodes([...NewEpisode]);
                                            }}
                                        >
                                            Xóa
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
