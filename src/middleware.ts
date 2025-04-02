import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  
console.log(req.url)
  return NextResponse.next();
}

// Визначаємо маршрути, для яких застосовується middleware
export const config = {
  matcher: ["/:path*","/","/catalog"], // Захищені сторінки
};
