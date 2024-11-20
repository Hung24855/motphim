import Select, { Option } from "@/base/libs/select";
import { removeMark } from "@/base/utils/function";
import { CountriesService } from "@/domain/quoc-gia/service";
import { GenresService } from "@/domain/the-loai/service";
import { Fragment, SetStateAction } from "react";

type FilterType = {
    type?: "type1" | "type2";
    genre: string;
    country: string;
};

type FilterMoviesProps = {
    setFilterType: (value: SetStateAction<FilterType>) => void;
    filterType: FilterType;
};

export default function FilterMovies({ setFilterType, filterType }: FilterMoviesProps) {
    // Fillter movie  -- 18/11/2024 : 9h10
    // const allSearchParams = useGetAllSearchParams();
    // const searchParams = useSearchParams();
    // const { replace } = useRouter();
    // const pathName = usePathname();

    // const addSearchParams = (key: string, value: any) => {
    //     const params = new URLSearchParams(searchParams);
    //     const entries = Object.entries(allSearchParams);
    //     for (const [key, value] of entries) {
    //         params.set(key, value);
    //     }
    //     params.set(key, value);
    //     replace(`${pathName}?${params.toString()}`);
    // };
    const { data: genres } = GenresService.useGenres();
    const { data: countries } = CountriesService.useCountries();
    return (
        <Fragment>
            <Select
                placeholder="Chọn loại phim"
                onChange={(value) => {
                    const type = value === "Phim bộ" ? "phim-bo" : "phim-le";
                    // addSearchParams("type", type);
                    setFilterType({ ...filterType, type: value === "Phim bộ" ? "type1" : "type2" });
                }}
            >
                <Option>Phim bộ</Option>
                <Option>Phim lẻ</Option>
            </Select>
            <Select
                placeholder="Chọn thể loại"
                onChange={(value) => {
                    const genre = removeMark(value.toLowerCase()).replace(" ", "-").replace("đ", "d");
                    // addSearchParams("genre", genre);
                    setFilterType({
                        ...filterType,
                        genre
                    });
                }}
            >
                {genres?.map((genre) => <Option key={genre.id}>{genre.name}</Option>)}
            </Select>
            <Select
                placeholder="Chọn quốc gia"
                onChange={(value) => {
                    const country = removeMark(value.toLowerCase()).replace(" ", "-").replace("đ", "d");
                    // addSearchParams("country", country);
                    setFilterType({
                        ...filterType,
                        country
                    });
                }}
            >
                {countries?.map((coutry) => <Option key={coutry.id}>{coutry.name}</Option>)}
            </Select>
        </Fragment>
    );
}
