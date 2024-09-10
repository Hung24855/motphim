"use client";
import Tabs from "@/base/libs/tab";
import MovieClassification from "@/components/admin/create-movie/movie-classification";
import MovieEpisodeList from "@/components/admin/create-movie/movie-episode-list";
import MovieInfo from "@/components/admin/create-movie/movie-info";
import { MoviesService } from "@/domain/phim/services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export interface Episode {
    name: string;
    slug: string;
    link: string;
}

export interface FieldValues {
    movie_name: string;
    slug: string;
    content: string;
    image: string;
    trailer_youtube_url: string;
    time_per_episode: string;
    episode_current: string;
    episode_total: string;
    year: string;
    quality: string;
    movie_type_id: string;
    genresId: number[];
    countriesId: number[];
    episodes: Episode[];
}

export default function CreateMoviePage() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        reset
    } = useForm<FieldValues>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            movie_name: "",
            genresId: [2],
            countriesId: [1],
            movie_type_id: "type1",
            episodes: []
        }
    });

    const movieTabs = [
        { label: "Thông tin phim", content: <MovieInfo control={control} errors={errors} /> },
        {
            label: "Phân loại",
            content: <MovieClassification control={control} errors={errors} setValue={setValue} getValues={getValues} />
        },
        {
            label: "Danh sách tập phim",
            content: <MovieEpisodeList control={control} errors={errors} setValue={setValue} getValues={getValues} />
        }
    ];

    const { createMovieMutation, isPeddingCreateMovie } = MoviesService.use_movies();

    const Submit = (data: FieldValues) => {
        createMovieMutation({
            data,
            onError: () => {
                toast.error("Cố lỗi xảy ra!");
            },
            onSuccess: () => {
                toast.success("Tạo phim thành công!");
                window.location.reload();
            }
        });
    };
    // const [activeTab, setActiveTab] = useState("info");
    // const renderContent = () => {
    //     switch (activeTab) {
    //         case "info":
    //             return <div>Thông tin phim</div>;
    //         case "category":
    //             return <div>Phân loại</div>;
    //         case "episodeList":
    //             return <div>Danh sách tập phim</div>;
    //         case "update":
    //             return <div>Cập nhật</div>;
    //         case "others":
    //             return <div>Khác</div>;
    //         default:
    //             return null;
    //     }
    // };
    return (
        <div>
            <div className="mb-4 font-semibold">THÊM PHIM</div>
            {/* <div className="option mt-2 flex">
                <button
                    onClick={() => setActiveTab("info")}
                    className="rounded border border-b-transparent bg-white px-4 py-2"
                >
                    Thông tin phim
                </button>
                <button onClick={() => setActiveTab("category")} className="rounded px-4 py-2">
                    Phân loại
                </button>
                <button onClick={() => setActiveTab("episodeList")} className="rounded px-4 py-2">
                    Danh sách tập phim
                </button>
                <button onClick={() => setActiveTab("update")} className="rounded px-4 py-2">
                    Cập nhật
                </button>
                <button onClick={() => setActiveTab("others")} className="rounded px-4 py-2">
                    Khác
                </button>
            </div>
            <div className="min-h-screen w-full border bg-white px-4 py-2">{renderContent()}</div> */}
            <form onSubmit={handleSubmit(Submit)} method="POST">
                <Tabs tabs={movieTabs} />
                <div className="mt-2 flex gap-x-2">
                    <Spin indicator={<LoadingOutlined spin />} size="large" spinning={isPeddingCreateMovie}>
                        <button
                            className="rounded bg-green-600 px-3 py-2 text-white"
                            type="submit"
                            disabled={isPeddingCreateMovie}
                        >
                            Lưu thay đổi
                        </button>
                    </Spin>
                    <button className="rounded bg-gray-600 px-3 py-2 text-white">Hủy bỏ</button>
                </div>
            </form>
        </div>
    );
}
