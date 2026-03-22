export interface IPost {
    id?: number;
    title: string;
    content: string;
    authorId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IInputCreatePost extends Omit<IPost, "id" | "createdAt" | "updatedAt"> {}

export interface IInputUpdatePost extends Partial<Omit<IPost, "id" | "createdAt" | "updatedAt">> {}
