export interface Draw{
    _id?: string;
    lottery: string;
    draw: string;
    owner: string;
    favorite: boolean;
    img?: string;
    ballsqty: number;
    Data: any[];
    emitDate?: string;
    expiryDate?: string;
    updateDate?: string;
    day?: number;
    month?: number;
    year?: number;
}

export interface AdminDraw{
    _id?: string;
    lottery: string;
    draw: string;
    owner: string;
    active: boolean;
    favorite: boolean;
    ballsqty: number;
    max_values: number;
    img?: string;
    Games: Game[];
    emitDate?: Date;
    expiryDate?: Date;
    updateDate?: string;
}

export interface Game{
    type: string;
    filename?: string;
    Data: any[];
}

export enum TipoSorteo{
    GOLD = 'Sorteo Gold',
    PLATINUM = 'Sorteo Platinum',
    RANDOM = 'Sorteo por la maquina'
}