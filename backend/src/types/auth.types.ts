export interface JwtPayload {
    userId: string;
    email: string;
    name?: string;
    role?: string;
    image?: string;
}

export interface TokenResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        role?: string;
    }
}


export const UserRole = {
    USER: "user",
    MOD: "moderator",
    ADMIN: "admin"
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
