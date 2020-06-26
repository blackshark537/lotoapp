import { createAction, props} from '@ngrx/store';
import { Draw } from '../models/draw.model';
import { UserModel } from '../models/user.model';

export const GET = createAction('[user State] get user data');
export const Signin = createAction('[user State] SignIn', props<{user: UserModel}>());
export const Signup = createAction('[user State] SignUp', props<{user: UserModel}>());
export const ARCHIVE_DRAW = createAction('[user State] save user draw', props<{draw: Draw}>());
export const MARK_AS_FAVORITE = createAction('[user State] mark draw as favorite', props<{index: number}>());
export const RECICLE = createAction('[user State] send draw to recicle', props<{index: number}>());
export const ADMIN_RECICLE = createAction('[user State] send admin_draw to recicle', props<{draw: Draw}>());
export const DELETE_ONE = createAction('[user State] remove one draw', props<{index: number}>());
export const EMPTY_TRASHCAN = createAction('[user State] empty recicle bin');
export const SAVE_STATE = createAction('[user State] save state');