import useArray from "@/base/hooks/useArray";
import Button from "@/base/libs/button";
import Input from "@/base/libs/input";
import { ModalMotion } from "@/base/libs/modal";
import { CONLLECTION, handle_update_doc_firebase } from "@/database/firebase.services";
import { MoviesService } from "@/domain/phim/services";
import useDebounce from "@/infrastructure/hooks/useDebounce";
import { convertSearchParams } from "@/utils/function";
import Image from "next/image";
import { ChangeEvent, Fragment, useContext, useRef, useState } from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { ChatRoomContext } from ".";
import { MovieFirebaseInfo } from "./type";
import { arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import Loading from "@/base/libs/loading";
import clsx from "clsx";

export const RoomBody = () => {
    const { selectedRoom, RoomInfo } = useContext(ChatRoomContext);
    const playlistRef = useRef<HTMLDivElement>(null);
    const [searchText, setsearchText] = useState<string>("");
    const debouncedValue = useDebounce(searchText, 700);
    const { data: movies, isFetching } = MoviesService.get_search_movie({
        query: convertSearchParams(debouncedValue),
        movie_type_id: "type2"
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpenModalSelectMovie, setIsOpenModalSelectMovie] = useState<boolean>(false);
    const { value: moviesSelected, push, remove, clear } = useArray<MovieFirebaseInfo>();

    const [slug, setSlug] = useState<string>("");
    const { data: movieDetail, isFetching: isFetchingMovieDetail } = MoviesService.get_movie(slug);

    const handleOK = async () => {
        if (moviesSelected.length === 0) {
            return setIsOpenModalSelectMovie(false);
        }
        setIsLoading(true);
        await handle_update_doc_firebase({
            docInfo: {
                collectionName: CONLLECTION.ROOM_MOVIES,
                docId: selectedRoom?.doc_id as string
            },
            data: {
                list_movies: arrayUnion(...moviesSelected)
            }
        });
        toast.success("Thêm phim thành công!");
        setIsLoading(false);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsOpenModalSelectMovie(false);
        setsearchText("");
        clear();
    };

    return (
        <Fragment>
            <div className="scrollbar-none h-[calc(100vh-148px)] overflow-y-auto text-white">
                <div className="flex flex-col">
                    {/* video */}
                    {movieDetail ? (
                        <iframe
                            src={movieDetail[0].episodes[0].link}
                            className="z-20 aspect-video w-full overflow-hidden rounded-md bg-stone-900"
                            allowFullScreen
                            referrerPolicy="no-referrer"
                            loading="lazy"
                        />
                    ) : (
                        <div className="flex aspect-video h-full items-center justify-center">
                            <p className="text-2xl text-gray-400">Vui lòng chọn 1 phim bên dưới để xem!</p>
                        </div>
                    )}

                    {/* title */}
                    <div className={clsx("mb-4 flex", movieDetail ? "justify-between" : "justify-center")}>
                        <h1 className="mt-2 text-2xl font-bold text-white">
                            {movieDetail ? movieDetail[0].movie_name : ""}
                        </h1>
                        <div className="mt-4 flex gap-x-2">
                            <Button onClick={() => setIsOpenModalSelectMovie(true)}>Tìm phim</Button>
                            <Button
                                onClick={() => {
                                    playlistRef.current?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                Danh sách phát
                            </Button>
                        </div>
                    </div>

                    {/* content */}
                    <div className="mb-6 min-h-20 text-sm">{movieDetail ? movieDetail[0].content : ""}</div>

                    {/* Danh sách phát */}
                    <div ref={playlistRef}>
                        {RoomInfo?.list_movies.length ? (
                            RoomInfo.list_movies.map((movie) => (
                                <div className="mt-2 grid grid-cols-3 gap-x-2" key={movie.slug}>
                                    <div className="col-span-1 h-40 overflow-hidden rounded">
                                        <Image
                                            src={movie.image}
                                            alt="img"
                                            width={275}
                                            height={160}
                                            style={{ objectFit: "cover" }}
                                            className="object-top"
                                        />
                                    </div>
                                    <div className="col-span-2 flex h-40 flex-col justify-between p-1">
                                        <div className="space-y-1">
                                            <h2 className="text-xl">{movie.movie_name}</h2>
                                            <p className="text-xs text-gray-400">{`#${movie.lang} - ${movie.year}`}</p>
                                            <p className="text-xs text-gray-400">
                                                Thời gian : {movie.time_per_episode}
                                            </p>
                                        </div>
                                        <Button
                                            buttonClassName="!w-20"
                                            onClick={() => {
                                                setSlug(movie.slug);
                                            }}
                                            loading={isFetchingMovieDetail && slug === movie.slug}
                                        >
                                            Xem
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-xl text-gray-400">Không có phim trong danh sách phát!</p>
                        )}
                    </div>
                </div>
            </div>

            <ModalMotion
                onClose={handleCloseModal}
                onOk={handleOK}
                isOpen={isOpenModalSelectMovie}
                textOk="Xác nhận"
                loading={isLoading}
                modalContainerClassName="!top-40 !w-[500px]"
            >
                <Input
                    label="Tìm kiếm phim - (Lưu ý: Hiện tại chỉ hỗ trợ phim lẻ)"
                    placeholder="Nhập tên phim muốn xem"
                    value={searchText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setsearchText(e.target.value);
                    }}
                />

                <Loading loading={isFetching}>
                    <div className="min-h-10">
                        {movies &&
                            (movies.length > 0 ? (
                                <div className="scrollbar-none max-h-52 space-y-2 overflow-y-auto">
                                    {movies.map((movie, index) => (
                                        <div
                                            className="flex h-10 items-center justify-between overflow-hidden bg-gray-100"
                                            key={movie.slug}
                                        >
                                            <div className="flex items-center gap-x-2">
                                                <Image width={40} height={40} src={movie.image} alt="img" />
                                                <span>{movie.movie_name}</span>
                                            </div>
                                            {!moviesSelected.includes(movie) ? (
                                                <Button onClick={() => push(movie)}>Thêm</Button>
                                            ) : (
                                                <IoMdRemoveCircleOutline
                                                    className="cursor-pointer"
                                                    size={24}
                                                    onClick={() => {
                                                        remove(index);
                                                    }}
                                                    color="red"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                "Không tìm thấy phim này!"
                            ))}
                    </div>
                </Loading>
            </ModalMotion>
        </Fragment>
    );
};
