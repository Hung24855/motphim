import { ISuccessResponse } from "@/infrastructure/config/types/apiResponse";

export type User = {
    id: string;
    username: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
};

export type GetAllAccountDTO = ISuccessResponse<User[]>;
