import { createReducer, on, Action, State} from '@ngrx/store';
import {GET, SAVE, EDIT, DEL, EXIT, HttpResponse, Error} from '../actions/admin_draw.action';
import { Draw, AdminDraw } from '../models/draw.model';

export const initial_state: AdminDraw[] = JSON.parse(localStorage.getItem('admin_draw')) || [];

const DrawReducer = createReducer(initial_state, 
    on(GET, state => [...state]),
    on(SAVE, (state, new_draw) => [...state, new_draw]),
    on(EDIT, (state, { Draw, index}) =>{
        let new_state = [...state.slice(0)];
        new_state[index] = Draw;
        return new_state;
    }),
    on(EXIT, state =>{
        localStorage.setItem('admin_draw', JSON.stringify(state));
        return state;
    }),
    on(HttpResponse, (state, {draws}) => draws),
    on(Error, (state, {error})=>{
        console.error(error);
        return state
    })
);

export function reducerDraw(state: AdminDraw[], actions: Action){
    return DrawReducer(state, actions);
}