"use server"
import { cookies } from "next/headers"

export const getPremiumNews = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in! Please login."
        }
    }


    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/premium`, {
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

    const result = res.json();
    console.log("result",result, " this is the result")
    return result;

}