import { createAction, props} from '@ngrx/store';
import { Draw } from '../models/draw.model';
import { userLog, UserModel } from '../models/user.model';

export const GET = createAction('[user State] get user data');
export const GET_Success = createAction('[user State] get user data success', props<{resp: any}>());
export const Signin = createAction('[user State] SignIn', props<{user: userLog}>());
export const Signup = createAction('[user State] SignUp', props<{user: userLog}>());
export const SigninSuccess = createAction('[user State] Signin success', props<{resp: any}>())
export const SignupSuccess = createAction('[user State] Signup success')
export const ARCHIVE_DRAW = createAction('[user State] save user draw', props<{draw: Draw}>());
export const ARCHIVE_DRAW_SUCCESS = createAction('[user State] successfully saved user draw', props<{resp: any}>());
export const UPDATE = createAction('[user State] patch user', props<{user: UserModel}>())
export const MARK_AS_FAVORITE = createAction('[user State] mark draw as favorite', props<{index: number}>());
export const RECICLE = createAction('[user State] send draw to recicle', props<{index: number}>());
export const ADMIN_RECICLE = createAction('[user State] send admin_draw to recicle', props<{draw: Draw}>());
export const DELETE_ONE = createAction('[user State] remove one draw', props<{index: number}>());
export const EMPTY_TRASHCAN = createAction('[user State] empty recicle bin');
export const SAVE_STATE = createAction('[user State] save state');
export const Error = createAction('[user State] Error', props<{error: any}>());