class EndpointUrl {
    //the-loai
    get_genres = () => `/the-loai`;
    create_genre = () => `/the-loai`;
    update_genre = (id: number) => `/the-loai/${id}`;
    delete_genre = (id: number) => `/the-loai/${id}`;
    //quoc-gia
    get_countries = () => `/quoc-gia`;
    create_country = () => `/quoc-gia`;
    update_country = (id: number) => `/quoc-gia/${id}`;
    delete_country = (id: number) => `/quoc-gia/${id}`;
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
    get_favorite_movies = (user_id: string) => `/phim/yeu-thich/${user_id}`;
    // Check phim được yêu thích chưa
    check_favorite_movie = (movie_id: string) => `/phim/yeu-thich/kiem-tra/${movie_id}`;
    // Danh sách phim nổi bật
    get_featured_movies = () => `/danh-sach/noi-bat`;
    // Thống kê
    get_statistical = () => "/thong-ke";
    // Tài khoản
    get_accounts = () => `/danh-sach/tai-khoan`;
    update_user_info = () => `/thong-tin-ca-nhan`;
    //Thông báo
    save_token = () => `/thong-bao/luu-token`;
    send_notification = () => `/thong-bao/gui-thong-bao`;
    get_all_notifications = () => `/thong-bao/danh-sach-thong-bao`;
    read_notification = () => `/thong-bao`;

    //crawler
    crawler = () => `/crawlData`;
    crawlerUpdateData = () => `/crawlData`;
}

export const ENDPOINT_URL = new EndpointUrl();
