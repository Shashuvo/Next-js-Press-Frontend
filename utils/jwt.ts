import jwt from "jsonwebtoken"


const verifyToken = (token: string, secret: string) => {
    try {
        const verify = jwt.verify(token, secret);
        return {
            success: true,
            data: verify
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export const jwtUtils = {
    verifyToken
}