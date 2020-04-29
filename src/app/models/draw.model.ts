export interface Draw{
    _id: string;
    lottery: string;
    draw: string;
    owner: string;
    active: boolean;
    favorite: boolean;
    Data: any[];    
    emitDate?: Date;
    expiryDate?: Date;
}