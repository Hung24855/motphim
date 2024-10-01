import { CountriesDTO } from "../dto";

export interface DataCreateCountry {
    name: string;
    slug: string;
}

export interface DataUpdateCountry extends DataCreateCountry {
    id: number;
}

export type TResGetAllCountries = CountriesDTO[];
export type TResCreateCountry = CountriesDTO[];
export type TResUpdateCountry = CountriesDTO[];