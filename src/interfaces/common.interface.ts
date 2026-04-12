export interface IResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
}

export interface IPagination {
    page: number;
    limit: number;
    skip: number;
}

export interface ISendEmail {
    to: string;
    subject: string;
    html: string;
}
