import { Pool } from "pg";

export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
});

export default async function DB_Connect() {
    pool.connect((err, client, release) => {
        if (err) {
            console.error("Lỗi khi connect đến postgres: ", err.stack);
        }

        client?.query("SELECT NOW()", (err, result) => {
            release();
            if (err) {
                console.error("Lỗi khi connect đến postgres: ", err.stack);
            }
            console.log("Kết nối cơ sở dữ liệu thành công! ", result.rows[0].now);
        });
    });
}
