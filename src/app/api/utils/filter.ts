import { NextRequest } from "next/server";

export const Filter = (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const { country, year, limit = "20", sort_field, page = "1" } = Object.fromEntries(searchParams);

    const query: string[] = [];
    if (country) query.push(`country = '${country}'`);
    if (year) query.push(`year = '${year}'`);

    const where = query.length ? `${query.join(" AND ")}` : "";
    const orderBy = sort_field ? `ORDER BY ${sort_field}` : "";
    const limitSql = `LIMIT ${Number(limit)}`;
    const offset = page ? `OFFSET ${Number(limit) * (Number(page) - 1)}` : "";

    return {
        where,
        orderBy,
        limitSql,
        offset,
        page: Number(page),
        limit: Number(limit),
    };
};
