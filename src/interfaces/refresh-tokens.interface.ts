export interface IRefreshToken {
    id?: number;
    userId: string;
    revoked?: boolean;
    token: string;
    expiresAt: Date;
}

export interface IInputCreateRefreshToken extends IRefreshToken {}
