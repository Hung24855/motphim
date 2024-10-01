import { Episode } from "@/views/admin/movie/create/page";
import { useState } from "react";
import clsx from "clsx";
import { MoviesService } from "@/domain/phim/services";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { IoTrashBinSharp } from "react-icons/io5";

export default function CreateEpisodeUpdate({
    movie_id,
    refetchMovieDetail
}: {
    movie_id: string;
    refetchMovieDetail: () => void;
}) {
    const [Episodes, setEpisodes] = useState<Episode[]>([{ name: "1", link: "link-1", slug: "tap-1" }]);

    const { createEpisodeMutation, isPeddingCreateEpisode } = MoviesService.use_episodes();

    const CreateEpisodes = () => {
        if (Episodes.length === 0) {
            toast.error("Vui lòng thêm tập phim!");
            return;
        }
        createEpisodeMutation(
            {
                movie_id: movie_id,
                data: {
                    episodes: Episodes
                }
            },
            {
                onError: () => {
                    toast.error("Tạo tập phim thất bại!");
                },
                onSuccess: () => {
                    setEpisodes([{ name: "1", link: "link-1", slug: "tap-1" }]);
                    toast.success("Tạo tập phim thành công!");
                    refetchMovieDetail();
                }
            }
        );
    };
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
                }}
            >
                Thêm tập mới
            </button>

            <div className="mt-3">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Tên phim</th>
                            <th className="border p-2 text-left">Đường dẫn tĩnh</th>
                            <th className="border p-2 text-left">Link phim</th>
                            <th className="border p-2 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Episodes.map((episode, index) => (
                            <tr key={index}>
                                <td className="w-1/5 border">
                                    <input
                                        type="text"
                                        placeholder="1"
                                        value={episode.name}
                                        onChange={(e) => {
                                            const newEpisodes = [...Episodes];
                                            newEpisodes[index].name = e.target.value;
                                            setEpisodes(newEpisodes);
                                        }}
                                        className={clsx(
                                            "w-full p-2 outline-none disabled:bg-gray-200"
                                            // errors.episodes?.[index]?.name && "border border-b-red-500"
                                        )}
                                    />
                                </td>
                                <td className="w-1/5 border">
                                    <input
                                        type="text"
                                        placeholder="tap-1"
                                        value={episode.slug}
                                        onChange={(e) => {
                                            const newEpisodes = [...Episodes];
                                            newEpisodes[index].slug = e.target.value;
                                            setEpisodes(newEpisodes);
                                        }}
                                        className={clsx(
                                            "w-full p-2 outline-none disabled:bg-gray-200"
                                            // errors.episodes?.[index]?.slug && "border border-b-red-500"
                                        )}
                                    />
                                </td>
                                <td className="w-2/5 border">
                                    <input
                                        type="text"
                                        placeholder="Link phim"
                                        value={episode.link}
                                        onChange={(e) => {
                                            const newEpisodes = [...Episodes];
                                            newEpisodes[index].link = e.target.value;
                                            setEpisodes(newEpisodes);
                                        }}
                                        className={clsx(
                                            "w-full p-2 outline-none disabled:bg-gray-200"
                                            // errors.episodes?.[index]?.link && "border border-b-red-500"
                                        )}
                                    />
                                </td>
                                <td className="w-1/5 border px-4">
                                    {
                                        <div className="flex justify-center gap-x-2">
                                            <button
                                                type="button"
                                                className="flex items-center gap-x-1 rounded p-2 text-red-600"
                                                onClick={() => {
                                                    const newEpisodes = Episodes.filter(
                                                        (item, i) => item.name !== episode.name
                                                    );
                                                    setEpisodes(() => newEpisodes);
                                                }}
                                            >
                                                <IoTrashBinSharp size={15} /> Xóa
                                            </button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-3 flex justify-end">
                <Spin indicator={<LoadingOutlined spin />} size="large" spinning={isPeddingCreateEpisode}>
                    <button
                        type="button"
                        className="ml-4 rounded bg-green-600 px-3 py-2 text-white"
                        onClick={CreateEpisodes}
                    >
                        Lưu tập phim
                    </button>
                </Spin>
            </div>
        </div>
    );
}
