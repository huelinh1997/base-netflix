import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/util";

export async function middleware(req) {
  const token = req ? req.cookies.get("token")?.value : null;
  const userId = await getUserIdFromToken(token);
  const pathName = req.nextUrl.pathname;

  if (token && userId) {
    if (pathName.includes("/login")) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if ((!token || !userId) && pathName !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/", "/my-list", "/login", "/video/:path*"],
};
