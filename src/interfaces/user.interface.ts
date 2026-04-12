import { IPagination } from "./common.interface";
import type { TOrderBy } from "../types/common";

export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export interface IInputCreateUser extends IUser {}

export interface IInputUpdateUser extends Partial<IUser> {}

export interface IInputGetUsers extends IPagination {
    searchField?: string;
    search?: string;
    sortField?: string;
    sortBy?: TOrderBy;
}
