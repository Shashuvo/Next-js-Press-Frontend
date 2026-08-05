"use server"
import { cookies } from "next/headers"

export const getPremiumNews = async ({ query }: { query?: { [key: string]: string | string[] | undefined } }) => {
    // Bad Approach
    // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search.searchTerm}` : ""}`;

    const params = new URLSearchParams()

    if (query && query.searchTerm) {
        params.set("searchTerm", query.searchTerm as string)
    }

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in! Please login."
        }
    }


    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/premium?${params.toString()}`, {
        headers: {
            // Authorization: accessToken,
            // Authorization: `${accessToken}`,
            // Authorization: `Bearer ${accessToken}`,

            Cookie: `accessToken=${accessToken}`
        },
        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 6,
            tags: ["premium-news"]
        }
    });

    const result = await res.json();
    return result;

}