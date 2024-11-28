"use client";
import MaxWidth from "@/components/layout/max-width";
import { useState } from "react";
interface ImageItem {
    id: string;
    name: string;
    url: string;
}
export default function TestChonAnh() {
    const [images, setImages] = useState<ImageItem[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            id: crypto.randomUUID(),
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleRemoveImage = (id: string) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    };
    
    return (
        <MaxWidth className="flex min-h-screen flex-col items-center justify-center pt-20 text-white">
            <h2 className="text-lg font-bold">Chọn ảnh</h2>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mt-4" />
            <div className="mt-5">
                {images.length > 0 && (
                    <ul className="list-none p-0">
                        {images.map((image) => (
                            <li key={image.id} className="mb-2">
                                <div className="flex items-center">
                                    <img src={image.url} alt={image.name} className="mr-2 size-24 rounded" />
                                    <button
                                        className="ml-2 rounded border-none bg-red-500 px-3 py-1 text-white"
                                        onClick={() => handleRemoveImage(image.id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </MaxWidth>
    );
}
