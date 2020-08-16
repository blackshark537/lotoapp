import { createReducer, on, Action, State} from '@ngrx/store';
import { Draw } from '../models/draw.model';
import * as UserActions from '../actions/user.actions';

const Draw_State: Draw[] = []

const reducer = createReducer( Draw_State,
    on(UserActions.DRAW_BY_ID_SUCCESS, (state, { draw }) => {
        return [...draw.body];
    })
)

export function drawReducer(state: Draw[], action: Action){
    return reducer(state, action);
}