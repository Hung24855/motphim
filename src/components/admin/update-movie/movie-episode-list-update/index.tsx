import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { Episode, MoviesDTO } from "@/domain/phim/dto";
import { MoviesService } from "@/domain/phim/services";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { ModalMotion } from "@/base/libs/modal";

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

    const HandleChangeEpisode = (type: "update" | "delete") => {
        if (DeleteEpisode && type === "delete") {
            deleteEpisodeMutation({
                episode_id: DeleteEpisode.episode_id,
                onError: () => toast.error("Có lỗi xảy ra!"),
                onSuccess: () => {
                    toast.success("Xóa tập phim thành công!");
                    refetchMovieDetail();
                    setDeleteEpisode(null);
                }
            });
        }

        if (UpdateEpisode && type === "update") {
            updateEpisodeMutation({
                data: {
                    episode_id: UpdateEpisode.episode_id,
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
    };

    return (
        <div className="min-w-max">
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
                            <tr key={index}>
                                <td className="w-1/5 border border-gray-300">
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
                                <td className="w-1/5 border border-gray-300">
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
                                <td className="w-2/5 border border-gray-300">
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
                                <td className="w-1/5 border border-gray-300 px-2">
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
                                                className="flex items-center gap-x-1 rounded p-2 text-gray-600 hover:text-red-500"
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
                okButtonClassName="!bg-red-500"
            >
                {`Bạn có chắc chắn muốn xóa tập ${DeleteEpisode?.name} không ?`}
            </ModalMotion>
        </div>
    );
}
