import Slide from "@/components/home/slide";
import MaxWidth from "@/components/layout/max-width";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const img = "https://img.ophim.live/uploads/movies/du-phuong-hanh-thumb.jpg";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#030A1B]">
            <Slide />
            <MaxWidth className="min-h-screen w-screen overflow-hidden pt-2 text-white">
                <div className="mb-10">
                    <div className="flex justify-between">
                        <h1 className="text-2xl">Phim mới cập nhật</h1>
                        <div className="flex items-center space-x-4">
                            <button className="px-2 py-1">
                                <GrLinkPrevious />
                            </button>
                            <button className="px-2 py-1">
                                <GrLinkNext />
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-5 gap-4">
                        <div className="relative min-h-80 rounded">
                            <img src={img} alt="img" />
                            <div className="mt-2 flex justify-between">
                                <h2 className="line-clamp-1">Dữ phượng hành</h2>
                                <span className="text-primary">2024</span>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div>Vietsub</div>
                                <div>23 Phút/tập</div>
                            </div>
                            <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-1 text-sm">12 Tập</div>
                            <div className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-sm text-primary">
                                HD
                            </div>
                        </div>
                        <div className="relative min-h-80 rounded">
                            <img src={img} alt="img" />
                            <div className="mt-2 flex justify-between">
                                <h2 className="line-clamp-1">Dữ phượng hành</h2>
                                <span className="text-primary">2024</span>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div>Vietsub</div>
                                <div>23 Phút/tập</div>
                            </div>
                            <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-1 text-sm">12 Tập</div>
                            <div className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-sm text-primary">
                                HD
                            </div>
                        </div>
                        <div className="relative min-h-80 rounded">
                            <img src={img} alt="img" />
                            <div className="mt-2 flex justify-between">
                                <h2 className="line-clamp-1">Dữ phượng hành</h2>
                                <span className="text-primary">2024</span>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div>Vietsub</div>
                                <div>23 Phút/tập</div>
                            </div>
                            <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-1 text-sm">12 Tập</div>
                            <div className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-sm text-primary">
                                HD
                            </div>
                        </div>
                        <div className="relative min-h-80 rounded">
                            <img src={img} alt="img" />
                            <div className="mt-2 flex justify-between">
                                <h2 className="line-clamp-1">Dữ phượng hành</h2>
                                <span className="text-primary">2024</span>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div>Vietsub</div>
                                <div>23 Phút/tập</div>
                            </div>
                            <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-1 text-sm">12 Tập</div>
                            <div className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-sm text-primary">
                                HD
                            </div>
                        </div>
                        <div className="relative min-h-80 rounded">
                            <img src={img} alt="img" />
                            <div className="mt-2 flex justify-between">
                                <h2 className="line-clamp-1">Dữ phượng hành</h2>
                                <span className="text-primary">2024</span>
                            </div>
                            <div className="mt-2 flex justify-between">
                                <div>Vietsub</div>
                                <div>23 Phút/tập</div>
                            </div>
                            <div className="absolute left-3 top-3 rounded bg-black/40 px-2 py-1 text-sm">12 Tập</div>
                            <div className="absolute right-3 top-3 rounded bg-black/40 px-2 py-1 text-sm text-primary">
                                HD
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button className="rounded border border-primary px-4 py-2">Xem thêm</button>
                    </div>
                </div>
                <div className="mb-10">
                    <div className="flex justify-between">
                        <h1 className="text-2xl">Phim cổ trang</h1>
                        <div className="flex items-center space-x-4">
                            <button className="px-2 py-1">
                                <GrLinkPrevious />
                            </button>
                            <button className="px-2 py-1">
                                <GrLinkNext />
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-5 gap-4">
                        <div className="min-h-80 rounded bg-red-400">1</div>
                        <div className="min-h-80 rounded bg-red-400">1</div>
                        <div className="min-h-80 rounded bg-red-400">1</div>
                        <div className="min-h-80 rounded bg-red-400">1</div>
                        <div className="min-h-80 rounded bg-red-400">1</div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button className="rounded border border-primary px-4 py-2">Xem thêm</button>
                    </div>
                </div>
                <div className="mb-10">
                    <div className="flex justify-between">
                        <h1 className="text-2xl">Phim hành động</h1>
                        <div className="flex items-center space-x-4">
                            <button className="px-2 py-1">
                                <GrLinkPrevious />
                            </button>
                            <button className="px-2 py-1">
                                <GrLinkNext />
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-5 gap-4">
                        <div className="min-h-80 rounded bg-red-400">1</div>
                        <div className="min-h-80 rounded bg-red-400">1</div>
                        <div className="min-h-80 rounded bg-red-400">1</div>
                        <div className="min-h-80 rounded bg-red-400">1</div>
                        <div className="min-h-80 rounded bg-red-400">1</div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button className="rounded border border-primary px-4 py-2">Xem thêm</button>
                    </div>
                </div>
            </MaxWidth>
        </main>
    );
}
