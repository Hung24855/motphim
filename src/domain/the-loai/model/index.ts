import { GenresDTO } from "../dto";

export interface DataCreateGenres {
    name: string;
    slug: string;
}

export interface DataUpdateGenres extends DataCreateGenres {
    id: number;
}

export type TResGetAllGenre = GenresDTO[];
export type TResCreateGenre = GenresDTO[];
export type TResUpdateGenre = GenresDTO[];
export type TResDeleteGenre = GenresDTO[];