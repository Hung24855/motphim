class EndpointUrl {
    baseAdmin: string;

    constructor() {
        this.baseAdmin = "/admin";
    }

    //the-loai
    get_genres = () => `/the-loai`;
    create_genre = () => `/the-loai`;
    update_genre = (id: string) => `${this.baseAdmin}/the-loai/${id}`;
    delete_genre = (id: string) => `${this.baseAdmin}/the-loai/${id}`;
    //quoc-gia
    get_countries = () => `/quoc-gia`;
    create_country = () => `/quoc-gia`;
    update_country = (id: string) => `${this.baseAdmin}/quoc-gia/${id}`;
    delete_country = (id: string) => `${this.baseAdmin}/quoc-gia/${id}`;
    //Phim
    get_movies = () => `/danh-sach`;
    get_movies_by_type = (slug: "phim-bo" | "phim-le") => `/danh-sach/${slug}`;
    get_movie = (slug: string) => `/phim/${slug}`;
    create_movie = () => `/phim`;
    update_movie = (id: string) => `/phim/${id}`;
    delete_movie = (id: string) => `/phim/${id}`;
    //Tap phim
    delete_episode = (episode: string) => `/phim/tap-phim/${episode}`;
    create_episodes = (movie_id: string) => `/phim/tap-phim/${movie_id}`;
    update_episode = (episode_id: string) => `/phim/tap-phim/${episode_id}`;
    //Phim theo theo loai
    get_movies_by_genre = (slug: string) => `/the-loai/${slug}`;
    //Phim theo theo quoc gia
    get_movies_by_country = (slug: string) => `/quoc-gia/${slug}`;
    // Tim kiem
    search_movie = () => `/tim-kiem`;
    // Ẩn hiện phim
    change_visible_movie = (movie_id: string) => `/phim/an-hien/${movie_id}`;
    // Yêu thích và bỏ yêu thích
    favorite_movie = (movie_id: string) => `/phim/yeu-thich/${movie_id}`;
    // Danh sách phim yêu thích
    get_favorite_movies = (user_id: string) => `phim/yeu-thich/${user_id}`;
}

export const ENDPOINT_URL = new EndpointUrl();
