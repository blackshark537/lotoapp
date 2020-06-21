import { Draw } from './draw.model';

export interface UserModel{
    name: string;
    lastName?: string;
    phone?: string;
    gender?: string;
    credits?: number;
    password: string;
    archived: Draw[];
    recycle: Draw[];
    image?: string;
}