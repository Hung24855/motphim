import { ISuccessResponse } from "@/infrastructure/config/types/apiResponse";

export interface GenresDTO {
    movie_id: string;
    genres_id: number;
    id: number;
    name: string;
    slug: string;
}

export type GetAllGenresDTO = ISuccessResponse<GenresDTO[]>;
export type CreateGenresDTO = ISuccessResponse<GenresDTO[]>;
export type UpdateGenresDTO = ISuccessResponse<GenresDTO[]>;
export type DeleteGenresDTO = ISuccessResponse<GenresDTO[]>;
