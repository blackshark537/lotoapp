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

export interface UpdateUserInterface{
    email: string;
    credits?: number;
    importe?: number;
    active?: boolean;
}

export interface userLog{
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface UserAccounting {
    email: string;
    concepto: string;
    fecha: string;
    creditoInicial: number;
    debito: number;
    creditoFinal: number;
    day: number;
    month: number;
    year: number;
}

export interface SystemAccounting{
    creditoInicial: number;
    creditoFinal: number;
    importe: number;
    concepto: string;
    usuario: string;
    fecha: string;
    day: number;
    month: number;
    year: number;
}