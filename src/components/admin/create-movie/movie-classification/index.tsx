import { FieldValues } from "@/views/admin/movie/create/page";
import { title } from "process";
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface Props {
    control: Control<FieldValues, any>;
    errors: FieldErrors<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
}

type TheLoai = {
    title: string;
    slug: string;
};

type QuocGia = TheLoai;

const the_loai: TheLoai[] = [
    {
        title: "Cổ trang",
        slug: "co-trang"
    },
    {
        title: "Tình cảm",
        slug: "tinh-cam"
    },
    {
        title: "Viễn tưởng",
        slug: "vien-tuong"
    },
    {
        title: "Khoa học",
        slug: "khoa-hoc"
    },
    {
        title: "Võ thuật",
        slug: "vo-thuat"
    },
    {
        title: "Hành động",
        slug: "hanh-dong"
    }
];

const quoc_gia: QuocGia[] = [
    {
        title: "Trung quốc",
        slug: "trung-quoc"
    },
    {
        title: "Hồng Kông",
        slug: "hong-kong"
    },
    {
        title: "Ấn Độ",
        slug: "an-do"
    },
    {
        title: "Đức",
        slug: "duc"
    },
    {
        title: "Thổ Nhĩ Kỳ",
        slug: "tho-nhi-ky"
    },
    {
        title: "Đài Loan",
        slug: "dai-loan"
    }
];

export default function MovieClassification({ control, errors, setValue, getValues }: Props) {
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
                <div className="grid w-full grid-cols-3 gap-x-6">
                    {the_loai.map((item, index) => (
                        <Controller
                            name="genres"
                            control={control}
                            render={({ field }) => (
                                <span className="flex items-center gap-x-1">
                                    <input
                                        type="checkbox"
                                        id={item.slug}
                                        {...field}
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
                                    <label htmlFor="co-trang" className="cursor-pointer">
                                        {item.title}
                                    </label>
                                </span>
                            )}
                        />
                    ))}
                </div>
            </div>
            <div className="khu-vuc mt-4 w-full">
                <span className="font-semibold">Khu vực</span> <span className="ml-0.5 text-red-600">*</span>
                <div className="grid w-full grid-cols-3 gap-x-6">
                    {quoc_gia.map((item, index) => (
                        <Controller
                            name="countries"
                            control={control}
                            render={({ field }) => (
                                <span className="flex items-center gap-x-1">
                                    <input
                                        type="checkbox"
                                        id={item.slug}
                                        {...field}
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
                                    <label htmlFor="trung-quoc" className="cursor-pointer">
                                        {item.title}
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
