import { NextRequest } from "next/server";

export const Filter = (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const {
        year,
        limit = "20",
        sort_field,
        page = "1",
        movie_type_id,
        country,
        genre
    } = Object.fromEntries(searchParams);
    // Điều kiện
    const query: string[] = [];

    if (year) query.push(`year = '${year}'`);
    if (movie_type_id) query.push(`movie_type_id = '${movie_type_id}'`);
    if (country) query.push(`countries.slug = '${country}'`);
    if (genre) query.push(`genres.slug = '${genre}'`);
    const where = query.length ? `${query.join(" AND ")}` : "";

    // Sắp xếp
    const orderBy = sort_field ? `ORDER BY ${sort_field}` : "";

    // Phân trang
    const limitSql = `LIMIT ${Number(limit)}`;
    const offset = page ? `OFFSET ${Number(limit) * (Number(page) - 1)}` : "";

    return {
        where,
        orderBy,
        limitSql,
        offset,
        page: Number(page),
        limit: Number(limit)
    };
};
