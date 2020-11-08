import { Draw } from './draw.model';

export interface UserModel{
    _id?: string;
    name: string;
    nickName?: string;
    phone?: string;
    gender?: string;
    credits?: number;
    email: string;
    password: string;
    archived?: any[];
    recycle?: any[];
    active?: boolean;
    created: Date;
    img?: string;
    role?: string;
}

export interface userLog{
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}