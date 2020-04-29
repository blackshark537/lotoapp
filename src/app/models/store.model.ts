import { Draw } from './draw.model';
import { UserModel } from './user.model';

export class StoreModel{
    admin_draw: Draw[];
    user_state: UserModel;
}