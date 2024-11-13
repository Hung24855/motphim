import { User } from "../dto";

export type TResGetAllAccounts = User[];
export type TResGetInfoUser = User[];
export type TResVerifyCode = {
    token: string;
};
export type DataUpdateUser = {
    username: string;
    avatar?: string;
};

export type DataVerify = {
    email: string;
    code: string;
};

export type DataChangePassword = {
    newPassword: string;
    token: string;
};
