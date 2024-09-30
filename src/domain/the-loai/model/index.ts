export interface IDataCreateGenres {
    name: string;
    slug: string;
}

export interface IDataUpdateGenres extends IDataCreateGenres {
    id: number;
}
