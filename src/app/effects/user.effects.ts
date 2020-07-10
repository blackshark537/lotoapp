import { Injectable } from '@angular/core';
import { UserhttpService } from '../services/userhttp.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as user from '../actions/user.actions';
import { of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError, tap } from 'rxjs/operators'

@Injectable()
export class userEffects{

    signin$ = createEffect(() => 
    this.actions$.pipe(
        ofType(user.Signin),
        exhaustMap(payload => 
            this.httpService.signin(payload.user).pipe(
                map(resp => user.SigninSuccess({resp})),
                catchError(error => of(user.Error({error})))
            )
        )

    ));

    signup$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.Signup),
        exhaustMap(payload =>
            this.httpService.signup(payload.user).pipe(
                map(resp => user.SignupSuccess()),
                catchError(error => of(user.Error({error})))
            )
        )
    ));

    createDraw$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.ARCHIVE_DRAW),
        exhaustMap(payload =>
            this.httpService.saveDraw(payload.draw).pipe(
                map(resp => user.ARCHIVE_DRAW_SUCCESS({resp})),
                catchError(error => of(user.Error({error})))
            )
        )
    ));

    favoriteDraw$ = createEffect(() => 
    this.actions$.pipe(
        ofType(user.MARK_AS_FAVORITE),
        exhaustMap((payload)=> this.httpService.favoriteDraw(payload.draw).pipe(
                map(resp => user.GET_Populated()),
                catchError(error => of(user.Error({error})))
        ))
    ));

    getUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.GET),
        mergeMap(()=> this.httpService.getOneUser().pipe(
            map(resp => user.GET_Success({resp})),
            catchError(error => of(user.Error({error})))
        ))
    ));

    getUserPopulated$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.GET_Populated),
        mergeMap(()=> this.httpService.getPopulateUser().pipe(
            map(resp => user.GET_Success({resp})),
            catchError(error => of(user.Error({error})))
        ))
    ));

    patchUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.UPDATE),
        exhaustMap(payload =>
            this.httpService.updateUser(payload.user).pipe(
                map(() => user.GET()),
                catchError(error => of(user.Error({error})))
            )
        )
    ));


    constructor(
        private actions$: Actions,
        private httpService: UserhttpService
    ) {}
}