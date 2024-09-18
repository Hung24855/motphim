import { ISuccessResponse } from "@/infrastructure/config/types/apiResponse";

export interface CountriesDTO {
    id: number;
    name: string;
    slug: string;
}

export type GetAllCountriesDTO = ISuccessResponse<CountriesDTO[]>;
export type CreateCountriesDTO = ISuccessResponse<CountriesDTO[]>;
export type UpdateCountriesDTO = ISuccessResponse<CountriesDTO[]>;
export type DeleteCountriesDTO = ISuccessResponse<CountriesDTO[]>;
