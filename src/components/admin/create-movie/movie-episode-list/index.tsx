import { Episode, FieldValues } from "@/views/admin/movie/create/page";
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { IoTrashBinSharp } from "react-icons/io5";
import { BrushSquare, CloseSquare } from "iconsax-react";
import { Tooltip } from "antd";
interface Props {
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
}

export default function MovieEpisodeList({ control, setValue, getValues, errors }: Props) {
    const [Episodes, setEpisodes] = useState<Episode[]>([{ name: "1", link: "link-1", slug: "tap-1" }]);

    return (
        <div className="min-w-max">
            <button
                type="button"
                className="rounded bg-admin_primary px-3 py-2 text-white"
                onClick={() => {
                    setEpisodes((prevState) => [
                        ...prevState,
                        {
                            name: `${prevState.length + 1}`,
                            link: `link-${prevState.length + 1}`,
                            slug: `tap-${prevState.length + 1}`
                        }
                    ]);

                    setValue(`episodes`, Episodes);
                }}
            >
                Thêm tập mới
            </button>

            <div className="mt-3">
                <table className="min-w-full border-collapse border">
                    <thead>
                        <tr className="bg-[#f3f4f6]">
                            <th className="border p-2 text-left">Tên phim</th>
                            <th className="border p-2 text-left">Đường dẫn tĩnh</th>
                            <th className="border p-2 text-left">Link phim</th>
                            <th className="border p-2 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Episodes.map((episode, index) => (
                            <tr className="hover:bg-[#f2f0fd]" key={index}>
                                <td className="w-1/5 border">
                                    <Controller
                                        control={control}
                                        name={`episodes.${index}.name`}
                                        defaultValue={episode.name}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="1"
                                                className={clsx(
                                                    "h-full w-full p-2 outline-none",
                                                    errors.episodes?.[index]?.name && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="w-1/5 border">
                                    <Controller
                                        control={control}
                                        name={`episodes.${index}.slug`}
                                        defaultValue={episode.slug}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="tap-1"
                                                className={clsx(
                                                    "h-full w-full p-2 outline-none",
                                                    errors.episodes?.[index]?.slug && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="w-2/5 border">
                                    <Controller
                                        control={control}
                                        name={`episodes.${index}.link`}
                                        defaultValue={episode.link}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="Link phim"
                                                className={clsx(
                                                    "h-full w-full p-2 outline-none",
                                                    errors.episodes?.[index]?.link && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="w-1/5 border">
                                    <div className="flex items-center justify-center gap-x-1">
                                        {index !== 0 && (
                                            <button
                                                type="button"
                                                className="flex items-center gap-x-1 rounded p-2 text-gray-600 hover:text-red-600"
                                                onClick={() => {
                                                    let NewEpisodes = getValues("episodes").filter(
                                                        (_, i) => i !== index
                                                    );
                                                    setEpisodes(NewEpisodes);
                                                    setValue(`episodes`, NewEpisodes);
                                                }}
                                            >
                                                <Tooltip title="Xóa">
                                                    <CloseSquare size={18} color="red" />
                                                </Tooltip>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
