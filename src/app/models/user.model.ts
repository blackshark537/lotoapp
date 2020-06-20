import { Draw } from './draw.model';

export interface UserModel{
    name: string;
    password: string;
    archived: Draw[];
    recycle: Draw[];
    image?: string;
}