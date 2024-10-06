import { User } from "../dto";

export type TResGetAllAccounts = User[];
export type TResGetInfoUser = User[];
export type DataUpdateUser = {
    username: string;
    avatar?: string;
};
