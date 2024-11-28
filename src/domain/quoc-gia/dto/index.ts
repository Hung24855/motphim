import { ISuccessResponse } from "@/infrastructure/config/types/apiResponse";

export interface CountriesDTO {
    id: number;
    name: string;
    slug: string;
}

export type GetAllCountriesDTO = ISuccessResponse<CountriesDTO[]>;
export type CreateCountryDTO = ISuccessResponse<CountriesDTO[]>;
export type UpdateCountryDTO = ISuccessResponse<CountriesDTO[]>;
export type DeleteCountryDTO = ISuccessResponse<CountriesDTO[]>;

