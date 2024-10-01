import { useEffect, useState } from "react";
import clsx from "clsx";
import { Episode, MoviesDetailDTO } from "@/domain/phim/dto";
import { MoviesService } from "@/domain/phim/services";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { ModalMotion } from "@/base/libs/modal";

interface Props {
    movie: MoviesDetailDTO;
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

    const HandleChangeEpisode = (type: "update" | "delete") => {
        if (DeleteEpisode && type === "delete") {
            deleteEpisodeMutation(DeleteEpisode.episode_id, {
                onError: () => {},
                onSuccess: () => {
                    toast.success("Xóa tập phim thành công!");
                    refetchMovieDetail();
                    setDeleteEpisode(null);
                }
            });
        }

        if (UpdateEpisode && type === "update") {
            updateEpisodeMutation(
                {
                    episode_id: UpdateEpisode.episode_id,
                    data: { episodes: UpdateEpisode }
                },
                {
                    onError: () => {
                        toast.error("Cập nhật tập phim thất bại!");
                    },
                    onSuccess: () => {
                        toast.success("Cập nhật tập phim thành công!");
                        refetchMovieDetail();
                        setUpdateEpisode(null);
                    }
                }
            );
        }
    };

    return (
        <div className="min-w-max">
            <div className="mt-3">
                <table className="min-w-full border-collapse border">
                    <thead>
                        <tr className="bg-[#f3f4f6]">
                            <th className="border p-2 text-left">Tên phim</th>
                            <th className="border p-2 text-left">Đường dẫn tĩnh</th>
                            <th className="border p-2 text-left">Link phim</th>
                            <th className="border p-2 text-left">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Episodes.map((episode, index) => (
                            <tr key={index} className="hover:bg-[#f2f0fd]">
                                <td className="w-1/5 border">
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
                                        className={clsx("w-full p-2 outline-none disabled:bg-gray-200")}
                                    />
                                </td>
                                <td className="w-1/5 border">
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
                                        className={clsx("w-full p-2 outline-none disabled:bg-gray-200")}
                                    />
                                </td>
                                <td className="w-2/5 border">
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
                                        className={clsx("w-full p-2 outline-none disabled:bg-gray-200")}
                                    />
                                </td>
                                <td className="w-1/5 border px-2">
                                    <div className="flex items-center justify-center gap-x-1">
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
                                                className={clsx("flex items-center gap-x-1 rounded px-2 py-1", {
                                                    "bg-green-600 text-white":
                                                        UpdateEpisode?.episode_id == episode.episode_id
                                                })}
                                                onClick={() => {
                                                    if (UpdateEpisode?.episode_id === episode.episode_id) {
                                                        HandleChangeEpisode("update");
                                                    } else {
                                                        setUpdateEpisode(episode);
                                                    }
                                                }}
                                            >
                                                {UpdateEpisode?.episode_id === episode.episode_id ? (
                                                    "Cập nhật"
                                                ) : (
                                                    <span className="flex items-center gap-x-1 hover:text-admin_primary">
                                                        <FaRegEdit size={15} /> Sửa
                                                    </span>
                                                )}
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
                                                className="flex items-center gap-x-1 rounded p-2 text-red-500"
                                                onClick={() => {
                                                    setDeleteEpisode(episode);
                                                }}
                                            >
                                                <IoTrashBinSharp size={15} /> Xóa
                                            </button>
                                        </Spin>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal xóa tập phim */}
            <ModalMotion
                textHeader="Xác nhận"
                onClose={() => {
                    setDeleteEpisode(null);
                }}
                onOk={() => {
                    HandleChangeEpisode("delete");
                }}
                isOpen={!!DeleteEpisode}
                textOk="Xóa"
                loading={isPeddingDeleteEpisode}
                modalContainerClassName="!gap-y-4"
                okButtonClassName="!bg-red-500"
            >
                {`Bạn có chắc chắn muốn xóa tập ${DeleteEpisode?.name} không ?`}
            </ModalMotion>
        </div>
    );
}
