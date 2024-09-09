"use client";
import Tabs from "@/base/libs/tab";
import MovieClassification from "@/components/admin/create-movie/movie-classification";
import MovieEpisodeList from "@/components/admin/create-movie/movie-episode-list";
import MovieInfo from "@/components/admin/create-movie/movie-info";
import { useForm } from "react-hook-form";

export interface Episode {
    name: string;
    slug: string;
    link: string;
}

export interface FieldValues {
    movie_name: string;
    thumbnail_img: string;
    trailer_youtube_url: string;
    episode_duration: string;
    current_episode: string;
    total_episodes: string;
    year_publication: string;
    quality: string;
    movie_type_id: string;
    genres: string[];
    countries: string[];
    episodes: Episode[];
}

export default function CreateMoviePage() {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        getValues,
        reset
    } = useForm<FieldValues>({
        reValidateMode: "onSubmit",
        defaultValues: {
            movie_name: "",
            genres: [],
            countries: [],
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
        { label: "Danh sách tập phim", content: <MovieEpisodeList control={control} errors={errors} /> },
        { label: "Khác", content: <div>Thông tin khác về phim</div> }
    ];

    const Submit = (data: any) => {
        console.log("data", data);
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
            <form onSubmit={handleSubmit(Submit)}>
                <Tabs tabs={movieTabs} />
                <div className="mt-2 flex gap-x-2">
                    <button className="rounded bg-green-600 px-3 py-2 text-white" type="submit">
                        Lưu Và Quay lại
                    </button>
                    <button className="rounded bg-gray-600 px-3 py-2 text-white">Hủy bỏ</button>
                </div>
            </form>
        </div>
    );
}
