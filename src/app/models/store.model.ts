import { Draw, AdminDraw } from './draw.model';
import { UserModel } from './user.model';

export class StoreModel{
    draw_state: Draw[];
    admin_draw: AdminDraw[];
    user_state: UserModel;
    users_profiles: UserModel[];
}