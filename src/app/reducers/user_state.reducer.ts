import { createReducer, on, Action} from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { RECICLE, DELETE_ONE, EMPTY_TRASHCAN, SAVE_STATE, ADMIN_RECICLE, Error, SigninSuccess, SignupSuccess, ARCHIVE_DRAW_SUCCESS, GET_Success} from '../actions/user.actions';

export const user_state: UserModel = {
    archived: [],
    name: 'Administrador',
    credits: 0,
    gender: 'male',
    created: new Date(Date.now()),
    email: null,
    phone: null,
    password: null,
    recycle: [],
}

export async function presentLoading() {
    const loading = document.createElement('ion-loading');
  
    loading.cssClass = 'my-custom-class';
    loading.message = 'Por favor, espere...';
    loading.duration = 2000;
    loading.backdropDismiss = false;
    loading.animated = true,
    loading.translucent = true
    document.body.appendChild(loading);
    await loading.present();
    await loading.onDidDismiss();
}

export async function presentAlert(head, sub_head, msg) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = head;
    alert.subHeader = sub_head;
    alert.message = msg;
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    return alert.present();
}

export const userReducer = createReducer(user_state,
    on(GET_Success, (state ,{resp})=>{
        
        let user = {...resp.body}
        if(!user.archived.length){
            user.archived = [user.archived]
        } else {
            user.archived = [...user.archived].reverse();
        }
        return {...user};
    }),
    on(ARCHIVE_DRAW_SUCCESS, (state, {resp})=>{
        let user = {...state};
        user.archived = user.archived? [...user.archived] : [];
        return user;
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
        return {...state}
    }),
    on(SigninSuccess, (state, {resp})=>{
        presentLoading().then(async () => {
            localStorage.setItem('token', resp.body.token)
            localStorage.setItem('role', resp.body.profile.role)
            window.location.href = '/#/lottery/inicio'
        });
        return resp.body.profile;
    }),
    on(SignupSuccess, (state)=>{
        
        presentLoading().then(async ()=>{
            await presentAlert('Atención!', 'Usuario creado con éxito.', 'Por favor inicie sesión.');
        });
        return state
    }),
    on(Error, (state, {error} )=>{
        presentAlert('Error!', 'Lo sentimos a ocurrido un error', `<strong>${error}</strong>`);
        return state
    })
);

export function UserReducer(state: UserModel, actions: Action){
    return userReducer(state, actions);
}