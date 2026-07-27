import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    // return NextResponse.redirect(new URL('/', request.url))
    console.log(request)
    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}