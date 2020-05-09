export interface Draw{
    _id: string;
    lottery: string;
    draw: string;
    owner: string;
    active: boolean;
    filename?: string;
    favorite: boolean;
    ballsqty: number;
    Data: any[];    
    emitDate?: Date;
    expiryDate?: Date;
}