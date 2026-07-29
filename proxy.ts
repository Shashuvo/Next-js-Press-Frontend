import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken"

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = ["/", "/news"];

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    const accessToken = request.cookies.get("accessToken")?.value;

    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;

    let userRole = null;

    if (decodedToken) {
        userRole = decodedToken.role;
    }

    

    // user is logged in but trying to access login or register, then redirect to their role dashboard or home page
    if (accessToken && AUTH_ROUTES.includes(pathName)) {
        if (userRole === "USER") {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }
        else if (userRole === "AUTHOR") {
            return NextResponse.redirect(new URL('/author-dashboard', request.url));
        }
        else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"));

    const isAuthRoute = AUTH_ROUTES.some((route) => pathName === route || pathName.startsWith(route + "/"));

    // authenticated pages protection
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathName.startsWith("/dashboard") && userRole !== "USER") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }
    else if (pathName.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }
    else if (pathName.startsWith("/author-dashboard") && userRole !== "AUTHOR") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }
 
    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}