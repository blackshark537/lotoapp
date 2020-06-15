import { createReducer, on, Action} from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { GET, ARCHIVE_DRAW, MARK_AS_FAVORITE, RECICLE, DELETE_ONE, EMPTY_TRASHCAN, SAVE_STATE, ADMIN_RECICLE} from '../actions/user.actions';

export const user_state: UserModel = JSON.parse(localStorage.getItem('user_data')) || {
    archived: [],
    name: 'Administrador',
    password: '',
    recicle: [],
}

export const userReducer = createReducer(user_state,
    on(GET, state =>{
         return {...state};
    }),
    on(ARCHIVE_DRAW, (state, {draw})=>{
        let new_state = {...state};
        new_state.archived = [...new_state.archived, draw];
        return {...new_state};
    }),
    on(MARK_AS_FAVORITE, (state, {index})=>{
        let new_state = {...state}; //remove readonly state
        let new_archive = [...new_state.archived]; //remove readonly archive
        let new_data = {...new_archive[index]};//remove readonly archive data
        new_data.favorite = !new_data.favorite;
        new_archive[index]=new_data;
        new_state.archived = new_archive;
        return new_state;
    }),
    on(RECICLE, (state, {index})=>{
        let new_state = {...state}; //remove readonly state
        let new_archive = [...new_state.archived]; //remove readonly archive
        new_state.recicle = [...new_state.recicle, new_state.archived[index]]; //move archive to recicle
        let new_data = [...new_archive.slice(0, index), ...new_archive.slice(index +1)]; //delete archive
        new_archive=new_data;
        new_state.archived = new_archive;
        //new_state.recicle = new_recicle;
        return {...new_state};
    }),
    on(ADMIN_RECICLE, (state, {draw})=>{
        let new_state = {...state};
        new_state.recicle = [...new_state.recicle, draw];
        return new_state;
    }),
    on(DELETE_ONE, (state, {index})=>{
        let new_state = {...state}; //remove readonly state
        let new_recicle = [...new_state.recicle.slice(0, index), ...new_state.recicle.slice(index+1)]; //remove readonly recicle
        new_state.recicle = new_recicle;
        return {...new_state};
    }),
    on(EMPTY_TRASHCAN, (state)=>{
        let new_state = {...state};
        new_state.recicle = [];
        return {...new_state};
    }),
    on(SAVE_STATE, state=>{
        localStorage.setItem('user_data', JSON.stringify(state));
        return {...state}
    })
);

export function UserReducer(state: UserModel, actions: Action){
    return userReducer(state, actions);
}