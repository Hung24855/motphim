export { auth as middleware } from "@/auth";

export const config = {
    matcher: ["/dang-nhap", "/admin/:path*"]
};
