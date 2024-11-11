import { ISuccessResponse } from "@/infrastructure/config/types/apiResponse";


export interface GenresDTO {
    id: number;
    name: string;
    slug: string;
}


export type GetAllGenresDTO = ISuccessResponse<GenresDTO[]>;
export type CreateGenreDTO = ISuccessResponse<GenresDTO[]>;
export type UpdateGenreDTO = ISuccessResponse<GenresDTO[]>;
export type DeleteGenreDTO = ISuccessResponse<GenresDTO[]>;
