"use client";
import Tabs from "@/base/libs/tab";
import { MoviesService } from "@/domain/phim/services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import MovieInfoUpdate from "@/components/admin/update-movie/movie-info-update";
import MovieClassificationUpdate from "@/components/admin/update-movie/movie-classification-update";
import MovieEpisodeListUpdate from "@/components/admin/update-movie/movie-episode-list-update";
import Link from "next/link";
import CreateEpisodeUpdate from "@/components/admin/update-movie/create-apisode-update";
import { IDataUpdateMovieType } from "@/domain/phim/model";
import "@/infrastructure/styles/uiverse.io.css";
import Loading from "@/base/libs/loading";

export interface Episode {
    name: string;
    slug: string;
    link: string;
}

export type FieldValues = IDataUpdateMovieType;

export default function EditMoviePage({ slug }: { slug: string }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<FieldValues>({
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });
    const { data: response, refetch: refetchMovieDetail } = MoviesService.get_movie(slug);
    const { updateMovieMutation, isPeddingUpdateMovie } = MoviesService.use_movies({});
    const movie = response?.data[0];
    if (!movie) return <Loading loading={true} backgroundOverlayClassName="bg-black/5"></Loading>;

    const movieTabs = [
        { label: "Thông tin phim", content: <MovieInfoUpdate control={control} errors={errors} movie={movie} /> },
        {
            label: "Phân loại",
            content: (
                <MovieClassificationUpdate
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                    movie={movie}
                />
            )
        },
        {
            label: "Thêm tập phim",
            content: <CreateEpisodeUpdate movie_id={movie.id} refetchMovieDetail={refetchMovieDetail} />
        },
        {
            label: "Danh sách tập phim",
            content: <MovieEpisodeListUpdate movie={movie} refetchMovieDetail={refetchMovieDetail} />
        }
    ];

    const Submit = (data: FieldValues) => {
        updateMovieMutation({
            data: { data: data, id: movie.id },
            onError: () => {
                toast.error("Cố lỗi xảy ra!");
            },
            onSuccess: () => {
                toast.success("Cập nhật phim thành công!");
                refetchMovieDetail();
            }
        });
    };

    return (
        <div>
            <div className="mb-4 text-center font-semibold text-xl">CẬP NHẬT THÔNG TIN PHIM</div>
            <form onSubmit={handleSubmit(Submit)} method="POST">
                <Tabs tabs={movieTabs} />
                <div className="mt-2 flex gap-x-2">
                    <Spin indicator={<LoadingOutlined spin />} size="large" spinning={isPeddingUpdateMovie}>
                        <button
                            className="rounded bg-green-600 px-3 py-2 text-white"
                            type="submit"
                            disabled={isPeddingUpdateMovie}
                        >
                            Cập nhật
                        </button>
                    </Spin>
                    <Link href={"/admin/phim"}>
                        <button className="rounded bg-gray-400 px-3 py-2 text-white">Hủy bỏ</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
