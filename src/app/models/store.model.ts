import { Draw, AdminDraw } from './draw.model';
import { UserModel } from './user.model';

export class StoreModel{
    admin_draw: AdminDraw[];
    user_state: UserModel;
}