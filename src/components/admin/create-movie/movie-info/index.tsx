import Input from "@/base/libs/input";
import { FieldValues } from "@/views/admin/movie/create/page";
import { Fragment } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface Props {
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>;
}

export default function MovieInfo({ control, errors }: Props) {
    return (
        <Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
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
                            placeholder="VD: Tứ Phương Quán"
                            required
                            error={errors.movie_name}
                        />
                    )}
                />
                <Controller
                    name="slug"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Slug phim không thể để trống."
                    }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Slug"
                            placeholder="VD: tu-phuong-quan"
                            required
                            error={errors.slug}
                        />
                    )}
                />

                <Controller
                    name="image"
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
                            error={errors.image}
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
            </div>

            <Controller
                name="content"
                control={control}
                defaultValue=""
                rules={{
                    required: "Nội dung phim không thể để trống."
                }}
                render={({ field }) => (
                    <Input
                        field={field}
                        type="textarea"
                        label="Nội dung"
                        placeholder="Nội dung ....."
                        required
                        error={errors.content}
                    />
                )}
            />
            <div className="grid grid-cols-3 gap-x-4">
                <Controller
                    name="time_per_episode"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Thời lượng tập phim"
                            placeholder="45 Phút/tập"
                            required
                            error={errors.time_per_episode}
                            tranformMessagError="buttom"
                        />
                    )}
                />
                <Controller
                    name="episode_current"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Tập phim hiện tại"
                            placeholder="5"
                            error={errors.episode_current}
                            required
                            tranformMessagError="buttom"
                        />
                    )}
                />
                <Controller
                    name="episode_total"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Tổng số tập phim"
                            placeholder="40"
                            error={errors.episode_total}
                            required
                            tranformMessagError="buttom"
                        />
                    )}
                />
                <Controller
                    name="year"
                    control={control}
                    defaultValue="2024"
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Năm xuất bản"
                            placeholder="2024"
                            error={errors.year}
                            required
                            tranformMessagError="buttom"
                        />
                    )}
                />
                <Controller
                    name="quality"
                    control={control}
                    defaultValue="HD"
                    rules={{ required: "Không bỏ trống" }}
                    render={({ field }) => (
                        <Input
                            field={field}
                            label="Chất lượng"
                            placeholder="HD"
                            error={errors.quality}
                            required
                            tranformMessagError="buttom"
                        />
                    )}
                />
            </div>
        </Fragment>
    );
}
