
import { CountriesService } from "@/domain/quoc-gia/service";
import { GenresService } from "@/domain/the-loai/service";
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { FieldValues } from "@/views/admin/movie/edit/page";
import { MoviesDetailDTO } from "@/domain/phim/dto";

interface Props {
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    movie: MoviesDetailDTO;
}

export default function MovieClassificationUpdate({ control, errors, setValue, getValues, movie }: Props) {
    const { data: genres } = GenresService.useGenres();
    const { data: countries } = CountriesService.useCountries();

    const genresID = movie.genres.map((genre) => genre.genres_id);
    const countriesID = movie.countries.map((country) => country.country_id);

    return (
        <div className="w-max">
            <div className="dinh-dang">
                <span className="font-semibold">Định dạng</span> <span className="ml-0.5 text-red-600">*</span>
                <div className="flex flex-col">
                    <Controller
                        name="movie_type_id"
                        control={control}
                        defaultValue={movie.movie_type_id}
                        render={({ field }) => (
                            <span className="flex items-center gap-x-1">
                                <input
                                    type="radio"
                                    id="phim-bo"
                                    {...field}
                                    value={"type1"}
                                    defaultChecked={movie.movie_type_id === "type1"}
                                ></input>
                                <label htmlFor="phim-bo" className="cursor-pointer">
                                    Phim bộ
                                </label>
                            </span>
                        )}
                    />

                    <Controller
                        name="movie_type_id"
                        control={control}
                        render={({ field }) => (
                            <span className="flex items-center gap-x-1">
                                <input
                                    type="radio"
                                    id="phim-le"
                                    {...field}
                                    value={"type2"}
                                    defaultValue={movie.movie_type_id}
                                    defaultChecked={movie.movie_type_id === "type2"}
                                ></input>
                                <label htmlFor="phim-le" className="cursor-pointer">
                                    Phim lẻ
                                </label>
                            </span>
                        )}
                    />
                </div>
            </div>
            <div className="the-loai mt-4 w-full">
                <span className="font-semibold">Thể loại</span> <span className="ml-0.5 text-red-600">*</span>
                <div className="grid w-full grid-cols-5 gap-x-6">
                    {genres?.map((item, index) => (
                        <Controller
                            name="genresId"
                            control={control}
                            key={index}
                            defaultValue={movie.genres.map((genre) => {
                                return genre.genres_id;
                            })}
                            render={({ field }) => (
                                <span className="flex items-center gap-x-1">
                                    <input
                                        type="checkbox"
                                        id={item.slug}
                                        {...field}
                                        defaultChecked={genresID.includes(item.id)}
                                        value={item.id.toString()} // Convert the value to a string
                                        onChange={(e) => {
                                            let genres = getValues("genresId");
                                            setValue(
                                                "genresId",
                                                e.target.checked
                                                    ? [...genres, item.id]
                                                    : [...genres.filter((theloai_id) => item.id !== theloai_id)]
                                            );
                                        }}
                                    />
                                    <label htmlFor={item.slug} className="cursor-pointer">
                                        {item.name}
                                    </label>
                                </span>
                            )}
                        />
                    ))}
                </div>
            </div>
            <div className="khu-vuc mt-4 w-full">
                <span className="font-semibold">Khu vực</span> <span className="ml-0.5 text-red-600">*</span>
                <div className="grid w-full grid-cols-5 gap-x-6">
                    {countries?.map((item, index) => (
                        <Controller
                            name="countriesId"
                            control={control}
                            key={index}
                            defaultValue={movie.countries.map((country) => {
                                return country.country_id;
                            })}
                            render={({ field }) => (
                                <span className="flex items-center gap-x-1">
                                    <input
                                        type="checkbox"
                                        id={item.slug}
                                        {...field}
                                        defaultChecked={countriesID.includes(item.id)}
                                        value={item.id.toString()} // Convert the value to a string
                                        onChange={(e) => {
                                            let quocgia = getValues("countriesId");
                                            setValue(
                                                "countriesId",
                                                e.target.checked
                                                    ? [...quocgia, item.id]
                                                    : [
                                                          ...quocgia.filter(
                                                              (quocgia_id) => item.id !== quocgia_id
                                                          )
                                                      ]
                                            );
                                        }}
                                    />
                                    <label htmlFor={item.slug} className="cursor-pointer">
                                        {item.name}
                                    </label>
                                </span>
                            )}
                        />
                    ))}
                </div>
            </div>
            {/* <DevTool control={control} /> */}
        </div>
    );
}
