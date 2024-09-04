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
    //chi-tiet-phim
    get_movie = (slug: string) => `/phim/${slug}`;
}

export const ENDPOINT_URL = new EndpointUrl();
