import { TResDeletedMovie, TResGetMovies, TResGetSearchMovies } from "@/domain/phim/model";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { MutateOptions, QueryObserverResult, RefetchOptions, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { toast } from "react-toastify";
import { ModalMotion } from "@/base/libs/modal";

type Props = {
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TResGetSearchMovies, unknown>>;
    mutateAsyncDeleteMovie: (
        variables: string,
        options?: MutateOptions<TResDeletedMovie, Error, string, unknown> | undefined
    ) => Promise<TResDeletedMovie>;
    setMutibleChoseRow: (value: SetStateAction<string[]>) => void;
    setIsShowModalDeleteMultibleMovie: (value: SetStateAction<boolean>) => void;
    moviesSearch: TResGetSearchMovies | undefined;
    page: number;
    limit:number
    filterType: {
        type?: "type1" | "type2";
        genre: string;
        country: string;
    };
    mutibleChoisedRow: string[];
    isShowModalDeleteMultibleMovie: boolean,
    isPeddingDeleteMovie: boolean
};
export default function ModalDeleteMutibleMovie({
    refetch,
    mutateAsyncDeleteMovie,
    setMutibleChoseRow,
    setIsShowModalDeleteMultibleMovie,
    filterType,
    page,
    limit,
    moviesSearch,
    mutibleChoisedRow,
    isShowModalDeleteMultibleMovie,
    isPeddingDeleteMovie
}: Props) {
    const queryClient = useQueryClient();
    //Xóa nhiều phim  -- 14/11/2024 : 11h40
    const handleDeleteMutibleMovie = async () => {
        if (mutibleChoisedRow.length > 0) {
            await Promise.all(
                mutibleChoisedRow.map(async (movie_id) => {
                    await mutateAsyncDeleteMovie(movie_id);
                    if (moviesSearch) {
                        refetch();
                    } else {
                        queryClient.setQueryData(
                            [QUERY_KEY.GET_LIST_MOVIES, page,limit, filterType.type, filterType.country, filterType.genre],
                            (prevData: TResGetMovies) => ({
                                ...prevData,
                                data: prevData.data.filter((movie) => movie.id !== movie_id)
                            })
                        );
                    }
                })
            );
            toast.success("Xóa phim thành công.!");
            setIsShowModalDeleteMultibleMovie(false);
            setMutibleChoseRow([]);
        }
    };
    return (
        <ModalMotion
            textHeader="Xác nhận xóa danh sách phim phim"
            onClose={() => {
                setIsShowModalDeleteMultibleMovie(false);
            }}
            onOk={handleDeleteMutibleMovie}
            isOpen={isShowModalDeleteMultibleMovie}
            textOk="Xóa"
            loading={isPeddingDeleteMovie}
            modalContainerClassName="!gap-y-4"
            okButtonClassName="!bg-red-500 !text-white"
        >
            Bạn có chắc chắn muốn xóa những phim đã chọn không?
        </ModalMotion>
    );
}
