class EndpointUrl {
    baseAdmin: string;

    constructor() {
        this.baseAdmin = "/admin";
    }

    //the-loai
    get_genres = () => `/the-loai`;
    create_genre = () => `${this.baseAdmin}/the-loai`;
    update_genre = (id: string) => `${this.baseAdmin}/the-loai/${id}`;
    delete_genre = (id: string) => `${this.baseAdmin}/the-loai/${id}`;
    //quoc-gia
    get_countries = () => `/quoc-gia`;
    create_country = () => `${this.baseAdmin}/quoc-gia`;
    update_country = (id: string) => `${this.baseAdmin}/quoc-gia/${id}`;
    delete_country = (id: string) => `${this.baseAdmin}/quoc-gia/${id}`;
    //Phim
    get_movies = () => `/danh-sach`;
    get_movies_by_type = (slug: "phim-bo" | "phim-le") => `/danh-sach/${slug}`;
    get_movie = (slug: string) => `/phim/${slug}`;
    create_movie = () => `/phim`;

    //Phim theo theo loai
    get_movies_by_genre = (slug: string) => `/the-loai/${slug}`;
    //Phim theo theo quoc gia
    get_movies_by_country = (slug: string) => `/quoc-gia/${slug}`;
}

export const ENDPOINT_URL = new EndpointUrl();
