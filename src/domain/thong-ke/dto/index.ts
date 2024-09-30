export interface IStatisticalDTO {
    status: string;
    message: string;
    data: {
        total_movies: string;
        total_episodes: string;
        total_users: string;
        total_movies_create_this_month: string;
        rankView: Array<{
            movie_name: string;
            views: string;
        }>;
        new_update_movie: Array<{
            movie_name: string;
            updated_at: string;
        }>;
    };
}
