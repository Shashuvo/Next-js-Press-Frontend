/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isAccessTokenExist } from "@/service/getNewAccessToken";
import { revalidateTag } from "next/cache";

type PostState = {
    success: true,
    statusCode: number,
    message: string,
    data: Record<string, any>
}


export const createPost = async (prevState: PostState, formData: FormData) => {

    // console.log({
    //     title: formData.get("title"),
    //     content: formData.get("content"),
    //     thumbNail: formData.get("thumbNail"),
    //     tags: (formData.get("tags") as string).split(", "),
    //     isPremium: formData.get("isPremium") === "on"
    // });

    const payload = {
        title: formData.get("title"),
        content: formData.get("content"),
        thumbNail: formData.get("thumbNail"),
        tags: (formData.get("tags") as string).split(", "),
        isPremium: formData.get("isPremium") === "on"
    }

    const accessToken = await isAccessTokenExist();

    // const decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    // const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    // if(!decodedAccessToken?.success && decodedRefreshToken?.success){
    //         //access token has expired but refresh token is valid, get new access token from backend
    //         const result = await getNewAccessToken();

    //         if(result.success){
    //             const newAccessToken = result.data.accessToken;

    //             cookieStore.set("accessToken", newAccessToken , {
    //                 httpOnly : true,
    //                 maxAge : 60 * 60 * 24,
    //                 sameSite : "lax",
    //             });

    //             accessToken = newAccessToken;



    //         }
    //     }





    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/posts`, {
        method: "POST",
        headers: {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("my-posts", {
            expire: 0
        })
    }

    if (result.success && result.data.isPremium) {
        revalidateTag("premium-posts", {
            expire: 0
        })
    } else {
        revalidateTag("public-posts", {
            expire: 0
        })
    }



    return result
}

export const updatePost = async (postId: string, prevState: PostState, formData: FormData) => {
    // console.log(postId)

    // console.log({
    //     title: formData.get("title"),
    //     content: formData.get("content"),
    //     thumbNail: formData.get("thumbNail"),
    //     tags: (formData.get("tags") as string).split(", "),
    //     isPremium: formData.get("isPremium") === "on"
    // });
    const payload = {
        title: formData.get("title") ?? "",
        content: formData.get("content") ?? "",
        thumbNail: formData.get("thumbNail") ?? "",
        tags: (formData.get("tags") as string).split(", ") ?? "",
        isPremium: formData.get("isPremium") === "on"
    }


    const accessToken = await isAccessTokenExist();

    // const decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    // const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    // if(!decodedAccessToken?.success && decodedRefreshToken?.success){
    //         //access token has expired but refresh token is valid, get new access token from backend
    //         const result = await getNewAccessToken();

    //         if(result.success){
    //             const newAccessToken = result.data.accessToken;

    //             cookieStore.set("accessToken", newAccessToken , {
    //                 httpOnly : true,
    //                 maxAge : 60 * 60 * 24,
    //                 sameSite : "lax",
    //             });

    //             accessToken = newAccessToken;



    //         }
    //     }

    // const accessToken = await isAccessTokenExist()




    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie: `accessToken=${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("my-posts", {
            expire: 0
        })
    }

    if (result.success && result.data.isPremium) {
        revalidateTag("premium-posts", {
            expire: 0
        })
    } else {
        revalidateTag("public-posts", {
            expire: 0
        })
    }



    return result
}

export const getMyPosts = async () => {
    const accessToken = await isAccessTokenExist();

    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/posts/my-posts`, {
        headers: {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie: `accessToken=${accessToken}`
        },

        cache: "force-cache",
        next: {
            revalidate: 60 * 60 * 24, // 1day
            tags: ["my-posts"]
        }
    });

    const result = res.json();


    return result
}