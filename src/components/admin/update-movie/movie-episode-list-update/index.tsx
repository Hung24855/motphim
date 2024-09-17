import { useEffect, useState } from "react";
import clsx from "clsx";
import { Episode, MoviesDTO } from "@/domain/phim/dto";
import { MoviesService } from "@/domain/phim/services";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
    movie: MoviesDTO;
    refetchMovieDetail: () => void;
}

export default function MovieEpisodeListUpdate({ movie, refetchMovieDetail }: Props) {
    const [Episodes, setEpisodes] = useState<Episode[]>(() => {
        return [...movie.episodes];
    });

    useEffect(() => {
        setEpisodes([...movie.episodes]);
    }, [movie.episodes]);

    const [UpdateEpisode, setUpdateEpisode] = useState<Episode | null>(null);
    const [DeleteEpisode, setDeleteEpisode] = useState<Episode | null>(null);
    const { deleteEpisodeMutation, updateEpisodeMutation, isPeddingDeleteEpisode, isPeddingUpdateEpisode } =
        MoviesService.use_episodes();

    const handleInputChange = (field: keyof Episode, value: string) => {
        if (UpdateEpisode) {
            setUpdateEpisode({
                ...UpdateEpisode,
                [field]: value
            });
        }
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
                                    <input
                                        type="text"
                                        placeholder="Tên phim"
                                        value={
                                            UpdateEpisode?.episode_id === episode.episode_id
                                                ? UpdateEpisode.name
                                                : episode.name
                                        }
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        disabled={episode.episode_id !== UpdateEpisode?.episode_id}
                                        className={clsx("w-full px-4 py-2 outline-none disabled:bg-gray-200")}
                                    />
                                </td>
                                <td className="border border-gray-300">
                                    <input
                                        type="text"
                                        placeholder="Slug"
                                        value={
                                            UpdateEpisode?.episode_id === episode.episode_id
                                                ? UpdateEpisode.slug
                                                : episode.slug
                                        }
                                        onChange={(e) => handleInputChange("slug", e.target.value)}
                                        disabled={episode.episode_id !== UpdateEpisode?.episode_id}
                                        className={clsx("w-full px-4 py-2 outline-none disabled:bg-gray-200")}
                                    />
                                </td>
                                <td className="border border-gray-300">
                                    <input
                                        type="text"
                                        placeholder="Link phim"
                                        value={
                                            UpdateEpisode?.episode_id === episode.episode_id
                                                ? UpdateEpisode.link
                                                : episode.link
                                        }
                                        onChange={(e) => handleInputChange("link", e.target.value)}
                                        disabled={episode.episode_id !== UpdateEpisode?.episode_id}
                                        className={clsx("w-full px-4 py-2 outline-none disabled:bg-gray-200")}
                                    />
                                </td>
                                <td className="w-52 border border-gray-300 px-2">
                                    <div className="flex gap-x-1">
                                        {UpdateEpisode?.episode_id === episode.episode_id && (
                                            <button
                                                type="button"
                                                className="rounded bg-gray-500 px-2 py-1 text-white"
                                                onClick={() => setUpdateEpisode(null)}
                                            >
                                                Hủy
                                            </button>
                                        )}
                                        <Spin
                                            indicator={<LoadingOutlined spin />}
                                            spinning={
                                                isPeddingUpdateEpisode &&
                                                UpdateEpisode?.episode_id === episode.episode_id
                                            }
                                        >
                                            <button
                                                type="button"
                                                className={clsx("rounded bg-green-600 px-2 py-1 text-white", {
                                                    "bg-gray-500": UpdateEpisode?.episode_id !== episode.episode_id
                                                })}
                                                onClick={() => {
                                                    if (UpdateEpisode?.episode_id === episode.episode_id) {
                                                        const confirm = window.confirm(
                                                            "Bạn có chắc chắn muốn cập nhật tập phim này không?"
                                                        );
                                                        if (confirm) {
                                                            updateEpisodeMutation({
                                                                data: {
                                                                    episode_id: episode.episode_id,
                                                                    data: { episodes: UpdateEpisode }
                                                                },
                                                                onError: () => {
                                                                    toast.error("Cập nhật tập phim thất bại!");
                                                                },
                                                                onSuccess: () => {
                                                                    toast.success("Cập nhật tập phim thành công!");
                                                                    refetchMovieDetail();
                                                                    setUpdateEpisode(null);
                                                                }
                                                            });
                                                        }
                                                    } else {
                                                        setUpdateEpisode(episode);
                                                    }
                                                }}
                                            >
                                                {UpdateEpisode?.episode_id === episode.episode_id ? "Cập nhật" : "Sửa"}
                                            </button>
                                        </Spin>
                                        <Spin
                                            spinning={
                                                isPeddingDeleteEpisode &&
                                                DeleteEpisode?.episode_id === episode.episode_id
                                            }
                                            indicator={<LoadingOutlined spin />}
                                        >
                                            <button
                                                type="button"
                                                className="rounded bg-red-600 px-2 py-1 text-white"
                                                onClick={() => {
                                                    setDeleteEpisode(episode);
                                                    const confirm = window.confirm(
                                                        "Bạn có chắc chắn muốn xóa tập phim này không?"
                                                    );
                                                    if (confirm) {
                                                        deleteEpisodeMutation({
                                                            episode_id: episode.episode_id,
                                                            onError: () => toast.error("Có lỗi xảy ra!"),
                                                            onSuccess: () => {
                                                                toast.success("Xóa tập phim thành công!");
                                                                refetchMovieDetail();
                                                            }
                                                        });
                                                    }
                                                }}
                                            >
                                                Xóa
                                            </button>
                                        </Spin>
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
