import { CountriesService } from "@/domain/quoc-gia/service";
import { GenresService } from "@/domain/the-loai/service";
import { FieldValues } from "@/views/admin/movie/create/page";
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface Props {
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
}

export default function MovieClassification({ control, errors, setValue, getValues }: Props) {
    const { data: genres } = GenresService.useGenres();
    const { data: countries } = CountriesService.useCountries();
    return (
        <div className="w-max">
            <div className="dinh-dang">
                <span className="font-semibold">Định dạng</span> <span className="ml-0.5 text-red-600">*</span>
                <div className="flex flex-col">
                    <Controller
                        name="movie_type_id"
                        control={control}
                        render={({ field }) => (
                            <span className="flex items-center gap-x-1">
                                <input type="radio" id="phim-bo" {...field} value={"type1"} defaultChecked></input>
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
                                <input type="radio" id="phim-bo" {...field} value={"type2"}></input>
                                <label htmlFor="phim-bo" className="cursor-pointer">
                                    Phim bộ
                                </label>
                            </span>
                        )}
                    />
                </div>
            </div>
            <div className="dinh-dang mt-4 w-full">
                <span className="font-semibold">Thể loại</span> <span className="ml-0.5 text-red-600">*</span>
                <div className="grid w-full grid-cols-4 gap-x-6">
                    {genres?.data.map((item, index) => (
                        <Controller
                            name="genres"
                            control={control}
                            key={index}
                            render={({ field }) => (
                                <span className="flex items-center gap-x-1">
                                    <input
                                        type="checkbox"
                                        id={item.slug}
                                        {...field}
                                        defaultChecked={item.slug === "hanh-dong"}
                                        onChange={(e) => {
                                            let theloais = getValues("genres");
                                            // console.log(theloais);
                                            setValue(
                                                "genres",
                                                e.target.checked
                                                    ? [...theloais, "co-trang"]
                                                    : [...theloais.filter((theloai) => item.slug !== theloai)]
                                            );
                                        }}
                                    ></input>
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
                <div className="grid w-full grid-cols-4 gap-x-6">
                    {countries?.data.map((item, index) => (
                        <Controller
                            name="countries"
                            control={control}
                            key={index}
                            render={({ field }) => (
                                <span className="flex items-center gap-x-1">
                                    <input
                                        type="checkbox"
                                        id={item.slug}
                                        {...field}
                                        defaultChecked={item.slug === "trung-quoc"}
                                        onChange={(e) => {
                                            let quocgia = getValues("countries");
                                            setValue(
                                                "countries",
                                                e.target.checked
                                                    ? [...quocgia, item.slug]
                                                    : [...quocgia.filter((quocgia) => item.slug !== quocgia)]
                                            );
                                        }}
                                    ></input>
                                    <label htmlFor={item.slug} className="cursor-pointer">
                                        {item.name}
                                    </label>
                                </span>
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
