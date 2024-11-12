import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    publicRoutes: ["/"],
    afterAuth(auth, req, evt) {
      if (req.nextUrl.pathname === "/leaderboard" && !auth.userId) {
          return NextResponse.redirect(new URL("/", req.url));
      } 
      if (req.nextUrl.pathname === "/courses" && !auth.userId) {
        return NextResponse.redirect(new URL("/", req.url));
      } 
      if (req.nextUrl.pathname === "/learn" && !auth.userId) {
        return NextResponse.redirect(new URL("/", req.url));
      } 
      if (req.nextUrl.pathname === "/quests" && !auth.userId) {
        return NextResponse.redirect(new URL("/", req.url));
      } 
      if (req.nextUrl.pathname === "/lkpd" && !auth.userId) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (req.nextUrl.pathname === "/refleksi" && !auth.userId) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      if (req.nextUrl.pathname === "/compiler" && !auth.userId) {
        return NextResponse.redirect(new URL("/", req.url));
      }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};