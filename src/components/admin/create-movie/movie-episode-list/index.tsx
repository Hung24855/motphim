import { Episode, FieldValues } from "@/views/admin/movie/create/page";
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
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
                        {Episodes.map((episode, index) => (
                            <tr className="hover:bg-gray-50" key={index}>
                                <td className="w-1/5 border border-gray-300 px-4 py-2">
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
                                                    "w-full p-1 outline-none",
                                                    errors.episodes?.[index]?.name && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="-1/5 border border-gray-300 px-4 py-2">
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
                                                    "w-full p-1 outline-none",
                                                    errors.episodes?.[index]?.slug && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="w-2/5 border border-gray-300 px-4 py-2">
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
                                                    "w-full p-1 outline-none",
                                                    errors.episodes?.[index]?.link && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="-1/5 border border-gray-300 px-4 py-2">
                                    <div className="flex items-center justify-center gap-x-1">
                                        {index !== 0 && (
                                            <button
                                                type="button"
                                                className="flex items-center rounded p-2 text-gray-600 hover:text-red-600 gap-x-1"
                                                onClick={() => {
                                                    let NewEpisodes = getValues("episodes").filter(
                                                        (_, i) => i !== index
                                                    );
                                                    setEpisodes(NewEpisodes);
                                                    setValue(`episodes`, NewEpisodes);
                                                }}
                                            >
                                                <IoTrashBinSharp size={15} /> Xóa
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
