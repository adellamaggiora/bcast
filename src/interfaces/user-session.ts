export interface IUserSession {
    id: string;
    email: string;
    lastSignIn: Date;
    jwt: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        expriesAt: number;
    }
}