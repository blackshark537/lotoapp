import { createReducer, on, Action} from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { GET_All_Users_Success } from '../actions/user.actions';

const users_state: UserModel[] = [];

const users_reducer = createReducer(users_state, 
    on(GET_All_Users_Success, (state, {resp}) =>{
        //console.log(resp.body)
        return [...resp.body];
    })
);

export function UsersProfilesReducer(state: UserModel[], Actions: Action){
    return users_reducer(state, Actions);
}