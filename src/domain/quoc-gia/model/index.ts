export interface IDataCreateCountry {
    name: string;
    slug: string;
}

export interface IDataUpdateCountry extends IDataCreateCountry {
    id: number;
}
