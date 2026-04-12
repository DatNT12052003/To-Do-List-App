export interface IOTP {
    id: number;
    userId: number;
    code: string;
    expiresAt: Date;
    isUsed: boolean;
    type: "RESET_PASSWORD" | "VERIFY_EMAIL" | "LOGIN" | "CHANGE_EMAIL" | "TWO_FA";
}

export interface IInputCreateOTP extends Omit<IOTP, "id" | "isUsed"> {}

export interface IInputUseOTP {
    code: string;
    type: "RESET_PASSWORD" | "VERIFY_EMAIL" | "LOGIN" | "CHANGE_EMAIL" | "TWO_FA";
}
