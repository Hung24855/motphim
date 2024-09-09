import Input from "@/base/libs/input/page";
import { FieldValues } from "@/views/admin/movie/create/page";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface Props {
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>;
}

export default function MovieInfo({ control, errors }: Props) {
    return (
        <div className="w-max">
            <Controller
                name="movie_name"
                control={control}
                defaultValue=""
                rules={{
                    required: "Tên phim không thể để trống."
                }}
                render={({ field }) => (
                    <Input
                        field={field}
                        label="Tên phim"
                        placeholder="VD: Spiderman"
                        required
                        error={errors.movie_name}
                    />
                )}
            />
            <Controller
                name="thumbnail_img"
                control={control}
                defaultValue=""
                rules={{
                    required: "Ảnh phim không thể để trống."
                }}
                render={({ field }) => (
                    <Input
                        field={field}
                        label="Ảnh Thumb"
                        placeholder="Ảnh thumbnail"
                        required
                        error={errors.thumbnail_img}
                    />
                )}
            />
            <Controller
                name="trailer_youtube_url"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        field={field}
                        label="Trailer Youtube URL"
                        placeholder="Trailer Youtube URL"
                        error={errors.trailer_youtube_url}
                    />
                )}
            />

            <div className="grid grid-cols-3 gap-x-4">
                <Controller
                    name="episode_duration"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Thời lượng tập phim"
                            placeholder="45 Phút/tập"
                            required
                            error={errors.episode_duration}
                            tranform="buttom"
                        />
                    )}
                />
                <Controller
                    name="current_episode"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Tập phim hiện tại"
                            placeholder="5"
                            error={errors.current_episode}
                            required
                            tranform="buttom"
                        />
                    )}
                />
                <Controller
                    name="total_episodes"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Tổng số tập phim"
                            placeholder="40"
                            error={errors.total_episodes}
                            required
                            tranform="buttom"
                        />
                    )}
                />
                <Controller
                    name="year_publication"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Năm xuất bản"
                            placeholder="2024"
                            error={errors.year_publication}
                            required
                            tranform="buttom"
                        />
                    )}
                />
                <Controller
                    name="quality"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Chất lượng"
                            placeholder="HD"
                            error={errors.quality}
                            required
                            tranform="buttom"
                        />
                    )}
                />
            </div>
        </div>
    );
}
