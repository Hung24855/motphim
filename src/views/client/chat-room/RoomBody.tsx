import Button from "@/base/libs/button";
import Input from "@/base/libs/input";
import { ModalMotion } from "@/base/libs/modal";
import { Fragment, useState } from "react";

export const RoomBody = () => {
    const [isOpenModalSelectMovie, setIsOpenModalSelectMovie] = useState<boolean>(false);
    return (
        <Fragment>
            <div className="flex flex-col pt-2">
                <iframe
                    src="https://vip.opstream17.com/share/a9c154c4658d7fc48fd2be3ef34d9109"
                    className="z-20 aspect-video w-full overflow-hidden rounded-md bg-stone-900"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                    loading="lazy"
                />
                <div className="mt-6 flex justify-center gap-x-2">
                    <Button onClick={() => setIsOpenModalSelectMovie(true)}>Chọn phim</Button>
                    <Button>Danh sách phát</Button>
                </div>
            </div>

            <ModalMotion
                onClose={() => {
                    setIsOpenModalSelectMovie(false);
                }}
                onOk={() => {}}
                isOpen={isOpenModalSelectMovie}
                textOk="Xác nhận"
                modalContainerClassName="!top-40 !w-[500px]"
            >
                <Input label="Tìm kiếm phim" placeholder="Nhập tên phim muốn xem" />
            </ModalMotion>
        </Fragment>
    );
};
