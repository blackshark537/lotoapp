import { createReducer, on, Action, State} from '@ngrx/store';
import {GET, SAVE, EDIT, DEL, EXIT} from '../actions/admin_draw.action';
import { Draw } from '../models/draw.model';

export const initial_state: Draw[] = JSON.parse(localStorage.getItem('admin_draw')) || [];

const DrawReducer = createReducer(initial_state, 
    on(GET, state => [...state]),
    on(SAVE, (state, new_draw) => [...state, new_draw]),
    on(EDIT, (state, { Draw, index}) =>{
        let new_state = [...state.slice(0)];
        new_state[index] = Draw;
        return new_state;
    }),
    on(DEL, (state,{index})=> [...state.slice(0, index), ...state.slice(index+1) ]),
    on(EXIT, state =>{
        localStorage.setItem('admin_draw', JSON.stringify(state));
        return state;
    })
);

export function reducerDraw(state: Draw[], actions: Action){
    return DrawReducer(state, actions);
}