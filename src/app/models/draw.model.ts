export interface Draw{
    _id: string;
    lottery: string;
    draw: string;
    owner: string;
    active: boolean;
    filename?: string;
    favorite: boolean;
    ballsqty: number;
    img?: string;
    Data: any[];
    emitDate?: Date;
    expiryDate?: Date;
}

export interface AdminDraw{
    _id: string;
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
}

export interface Game{
    type: string;
    filename?: string;
    Data: any[];
}