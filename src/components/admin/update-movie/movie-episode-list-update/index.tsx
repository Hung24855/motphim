import { Episode, FieldValues } from "@/views/admin/movie/create/page";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import { MoviesDTO } from "@/domain/phim/dto";

interface Props {
    movie: MoviesDTO;
}

export default function MovieEpisodeListUpdate({ movie }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset
    } = useForm<FieldValues>({
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });
    const [Episodes, setEpisodes] = useState<Episode[]>(() => {
        return [...movie.episodes];
    });

    const [UpdateEpisode, setUpdateEpisode] = useState<Episode>({} as Episode);

    const handleUpdateEpisode = (episode: Episode) => {
        //do somthing
    };

    return (
        <div className="min-w-max">
            <div className="mt-3">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-40 border border-gray-300 px-4 py-2 text-left">Tên phim</th>
                            <th className="w-40 border border-gray-300 px-4 py-2 text-left">Slug</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Link phim</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Episodes.map((episode, index) => (
                            <tr className="hover:bg-gray-50" key={index}>
                                <td className="border border-gray-300">
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
                                                disabled={episode.name !== UpdateEpisode?.name}
                                                className={clsx(
                                                    "w-full px-4 py-2 outline-none disabled:bg-gray-200",
                                                    errors.episodes?.[index]?.name && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="border border-gray-300">
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
                                                disabled={episode.slug !== UpdateEpisode?.slug}
                                                className={clsx(
                                                    "w-full px-4 py-2 outline-none disabled:bg-gray-200",
                                                    errors.episodes?.[index]?.slug && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="border border-gray-300">
                                    <Controller
                                        control={control}
                                        name={`episodes.${index}.link`}
                                        defaultValue={episode.link}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                disabled={episode.link !== UpdateEpisode?.link}
                                                placeholder="Link phim"
                                                className={clsx(
                                                    "w-full px-4 py-2 outline-none disabled:bg-gray-200",
                                                    errors.episodes?.[index]?.link && "border border-b-red-500"
                                                )}
                                            />
                                        )}
                                    />
                                </td>
                                <td className="w-52 border border-gray-300 px-2">
                                    {index !== 0 && (
                                        <div className="flex gap-x-1">
                                            {UpdateEpisode?.name === episode.name && (
                                                <button
                                                    type="button"
                                                    className="rounded bg-gray-500 px-2 py-1 text-white"
                                                    onClick={() => {
                                                        setUpdateEpisode({} as Episode);
                                                    }}
                                                >
                                                    Hủy
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className={clsx("rounded bg-green-600 px-2 py-1 text-white", {
                                                    "bg-gray-500": UpdateEpisode?.name !== episode.name
                                                })}
                                                onClick={() => {
                                                    setUpdateEpisode(episode);

                                                    //Thêm popup xác nhận

                                                    //Cập nhật thông tin tập phim
                                                }}
                                            >
                                                {UpdateEpisode?.name === episode.name ? "Cập nhật" : "Sửa"}
                                            </button>

                                            <button
                                                type="button"
                                                className="rounded bg-red-600 px-2 py-1 text-white"
                                                onClick={() => {
                                                    let NewEpisodes = getValues("episodes").filter(
                                                        (_, i) => i !== index
                                                    );
                                                    setEpisodes(NewEpisodes);
                                                    setValue(`episodes`, NewEpisodes);
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        </div>
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
