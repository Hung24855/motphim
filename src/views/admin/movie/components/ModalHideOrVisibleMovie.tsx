import { ModalMotion } from "@/base/libs/modal";
import { TResGetMovies, TResGetSearchMovies } from "@/domain/phim/model";
import { MoviesService } from "@/domain/phim/services";
import { QUERY_KEY } from "@/infrastructure/constant/query-key";
import { QueryObserverResult, RefetchOptions, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { toast } from "react-toastify";
type MovieSelect = {
    movie_id: string;
    name: string;
    is_visible: boolean;
};

type Props = {
    setIsShowModal: (value: SetStateAction<boolean>) => void;
    setMovieSelect: (value: SetStateAction<MovieSelect | null>) => void;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TResGetSearchMovies, unknown>>;
    isShowModal: boolean;
    movieSelect: MovieSelect | null;
    moviesSearch: TResGetSearchMovies | undefined;
    page: number;
    filterType: {
        type?: "type1" | "type2";
        genre: string;
        country: string;
    };
};

export default function ModalHideOrVisibleMovie({
    setIsShowModal,
    setMovieSelect,
    refetch,
    isShowModal,
    moviesSearch,
    movieSelect,
    page,
    filterType
}: Props) {
    const queryClient = useQueryClient();
    const { isPendingChangeVisibleMovie, mutateChangeVisibleMovie } = MoviesService.change_visible_movie();
    const handleChangeIsVisibleMovie = () => {
        if (movieSelect) {
            mutateChangeVisibleMovie(
                { movie_id: movieSelect.movie_id, is_visible: !movieSelect.is_visible },
                {
                    onSuccess(data) {
                        toast.success("Cập nhật hiện thị thành công.");
                        setIsShowModal(false);
                        setMovieSelect(null);

                        if (moviesSearch) {
                            refetch();
                        } else {
                            queryClient.setQueryData(
                                [
                                    QUERY_KEY.GET_LIST_MOVIES,
                                    page,
                                    filterType.type,
                                    filterType.country,
                                    filterType.genre
                                ],
                                (prevData: TResGetMovies) => ({
                                    ...prevData,
                                    data: prevData.data.map((movie) => ({
                                        ...movie,
                                        is_visible: movie.id === data.id ? data.is_visible : movie.is_visible
                                    }))
                                })
                            );
                        }
                    },
                    onError(e) {}
                }
            );
        }
    };
    return (
        <ModalMotion
            textHeader="Xác nhận ẩn phim"
            onClose={() => {
                setIsShowModal(false);
                setMovieSelect(null);
            }}
            onOk={handleChangeIsVisibleMovie}
            isOpen={isShowModal}
            textOk={movieSelect?.is_visible ? "Ẩn" : "Hiện"}
            loading={isPendingChangeVisibleMovie}
            modalContainerClassName="!gap-y-4"
            okButtonClassName="!bg-admin_primary !text-white"
        >
            {movieSelect?.is_visible
                ? `Bạn có chắc chắn muốn ẩn phim "${movieSelect?.name}" không ?`
                : `Bạn có chắc chắn muốn hiện thị phim "${movieSelect?.name}" không ?`}
        </ModalMotion>
    );
}
