import Input from "@/base/libs/input";
import { MoviesDetailDTO } from "@/domain/phim/dto";
import { FieldValues } from "@/views/admin/movie/edit/page";

import { Control, Controller, FieldErrors } from "react-hook-form";

interface Props {
    control: Control<FieldValues>;
    errors: FieldErrors<FieldValues>;
    movie: MoviesDetailDTO;
}

export default function MovieInfoUpdate({ control, errors, movie }: Props) {
    return (
        <div className="w-max">
            <Controller
                name="movie_name"
                control={control}
                defaultValue={movie.movie_name}
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
                defaultValue={movie.slug}
                rules={{
                    required: "Slug phim không thể để trống."
                }}
                render={({ field }) => (
                    <Input field={field} label="Slug" placeholder="VD: tu-phuong-quan" required error={errors.slug} />
                )}
            />
            <Controller
                name="content"
                control={control}
                defaultValue={movie.content}
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
            <Controller
                name="image"
                control={control}
                defaultValue={movie.image}
                rules={{
                    required: "Ảnh phim không thể để trống."
                }}
                render={({ field }) => (
                    <Input field={field} label="Ảnh Thumb" placeholder="Ảnh thumbnail" required error={errors.image} />
                )}
            />
            <Controller
                name="trailer_youtube_url"
                control={control}
                defaultValue={""}
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
                    name="time_per_episode"
                    control={control}
                    defaultValue={movie.time_per_episode}
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
                    defaultValue={movie.episode_current.toString()}
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
                    defaultValue={movie.episode_total.toString()}
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
                    defaultValue={movie.year.toString()}
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
        </div>
    );
}
