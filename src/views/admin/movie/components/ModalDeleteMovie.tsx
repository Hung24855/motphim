import { ModalMotion } from "@/base/libs/modal";
import { TResDeletedMovie, TResGetMovies, TResGetSearchMovies } from "@/domain/phim/model";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { toast } from "react-toastify";
type MovieSelect = {
    movie_id: string;
    name: string;
    is_visible: boolean;
};
type Props = {
    deleteMovieMutation: UseMutateFunction<TResDeletedMovie, Error, string, unknown>;
    setIsShowModalDeleteMovie: (value: SetStateAction<boolean>) => void;
    setMovieSelect: (value: SetStateAction<MovieSelect | null>) => void;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TResGetSearchMovies, unknown>>;
    moviesSearch: TResGetSearchMovies | undefined;
    movieSelect: MovieSelect | null;
    page: number;
    limit:number;
    filterType: {
        type?: "type1" | "type2";
        genre: string;
        country: string;
    };
    isShowModalDeleteMovie: boolean;
    isPeddingDeleteMovie: boolean;
};
export default function ModalDeleteMovie({
    deleteMovieMutation,
    setIsShowModalDeleteMovie,
    setMovieSelect,
    refetch,
    moviesSearch,
    movieSelect,
    filterType,
    page,
    limit,
    isPeddingDeleteMovie,
    isShowModalDeleteMovie
}: Props) {
    const queryClient = useQueryClient();
    const handleDeleteMovie = () => {
        if (movieSelect) {
            deleteMovieMutation(movieSelect.movie_id, {
                onSuccess(data) {
                    toast.success("Xóa phim thành công.!");
                    setIsShowModalDeleteMovie(false);
                    setMovieSelect(null);
                    if (moviesSearch) {
                        refetch();
                    } else {
                        queryClient.setQueryData(
                            [QUERY_KEY.GET_LIST_MOVIES, page,limit, filterType.type, filterType.country, filterType.genre],
                            (prevData: TResGetMovies) => ({
                                ...prevData,
                                data: prevData.data.filter((movie) => movie.id !== data.id)
                            })
                        );
                    }
                },
                onError(e) {}
            });
        }
    };
    return (
        <ModalMotion
            textHeader="Xác nhận xóa phim"
            onClose={() => {
                setIsShowModalDeleteMovie(false);
                setMovieSelect(null);
            }}
            onOk={handleDeleteMovie}
            isOpen={isShowModalDeleteMovie}
            textOk="Xóa"
            loading={isPeddingDeleteMovie}
            modalContainerClassName="!gap-y-4"
            okButtonClassName="!bg-red-500 !text-white"
        >
            {`Bạn có chắc chắn muốn xóa phim "${movieSelect?.name}" không ?`}
        </ModalMotion>
    );
}
