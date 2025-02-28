import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("user"); // Kullanıcının auth durumunu kontrol et

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Token yoksa login sayfasına yönlendir
  }
}

export const config = {
  matcher: ["/admin/:path*"], // Private sayfaların yollarını belirle
};
