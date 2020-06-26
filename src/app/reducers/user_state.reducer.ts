import { createReducer, on, Action} from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { GET, ARCHIVE_DRAW, MARK_AS_FAVORITE, RECICLE, DELETE_ONE, EMPTY_TRASHCAN, SAVE_STATE, ADMIN_RECICLE, Error, SigninSuccess} from '../actions/user.actions';

export const user_state: UserModel = JSON.parse(localStorage.getItem('user_data')) || {
    archived: [],
    name: 'Administrador',
    credits: 0,
    gender: 'male',
    lastName:'',
    phone: null,
    password: null,
    recycle: [],
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
        new_state.recycle = [...new_state.recycle, new_state.archived[index]]; //move archive to recicle
        let new_data = [...new_archive.slice(0, index), ...new_archive.slice(index +1)]; //delete archive
        new_archive=new_data;
        new_state.archived = new_archive;
        //new_state.recicle = new_recicle;
        return {...new_state};
    }),
    on(ADMIN_RECICLE, (state, {draw})=>{
        let new_state = {...state};
        new_state.recycle = [...new_state.recycle, draw];
        return new_state;
    }),
    on(DELETE_ONE, (state, {index})=>{
        let new_state = {...state}; //remove readonly state
        let new_recicle = [...new_state.recycle.slice(0, index), ...new_state.recycle.slice(index+1)]; //remove readonly recicle
        new_state.recycle = new_recicle;
        return {...new_state};
    }),
    on(EMPTY_TRASHCAN, (state)=>{
        let new_state = {...state};
        new_state.recycle = [];
        return {...new_state};
    }),
    on(SAVE_STATE, state=>{
        localStorage.setItem('user_data', JSON.stringify(state));
        return {...state}
    }),
    on(SigninSuccess, (state, {resp})=>{
        localStorage.setItem('token', resp.body.token)
        localStorage.setItem('role', resp.body.profile.role)
        setTimeout(()=> window.location.href = '/#/inicio', 1000);
        return resp.body.profile;
    }),
    on(Error, (state, {error} )=>{
        console.error(error);
        return [...state]
    })
);

export function UserReducer(state: UserModel, actions: Action){
    return userReducer(state, actions);
}