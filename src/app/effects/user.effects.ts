import { Injectable } from '@angular/core';
import { UserhttpService } from '../services/userhttp.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as user from '../actions/user.actions';
import { of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError, tap } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable()
export class userEffects{

    signin$ = createEffect(() => 
    this.actions$.pipe(
        ofType(user.Signin),
        exhaustMap(payload => 
            this.httpService.signin(payload.user).pipe(
                map(resp =>{
                    //this.router.navigate(['/inicio']);
                    return user.SigninSuccess({resp})
                }),
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

    updateDraw$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.UPDATE_DRAW_BY_ID),
        exhaustMap(payload =>
            this.httpService.updateDraw(payload.draw).pipe(
                map(draw => user.GET_DRAW_BY_ID({id: draw.body._id})),
                catchError(error => of(user.Error({error})))
            )
        )
    ));

    getDrawById$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.GET_DRAW_BY_ID),
        exhaustMap(payload =>
            this.httpService.getDrawById(payload.id).pipe(
                map(draw => user.DRAW_BY_ID_SUCCESS({draw})),
                catchError(error => of(user.Error({error})))
            )
        )
    )
    );

    getDrawsByDate$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.GET_TODAY_DRAWS),
        exhaustMap(payload =>
            this.httpService.getTodayDraws().pipe(
                map(draw => user.DRAW_BY_ID_SUCCESS({draw})),
                catchError(error => of(user.Error({error})))
            )
        )
    )
    );

    createDraw$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.ARCHIVE_DRAW),
        exhaustMap(payload =>
            this.httpService.saveDrawByDate(payload.draw).pipe(
                map(resp => user.ARCHIVE_DRAW_SUCCESS({resp})),
                map(()=> user.GET()),
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

    chargeUser$ =createEffect(() =>
    this.actions$.pipe(
        ofType(user.CHARGE_USER),
        exhaustMap(({ballsQty, price}) => this.httpService.chargeUser(ballsQty, price).pipe(
            map(resp => user.GET()),
            catchError(error => of(user.Error({error})))
        ))
    ));

    getUserProfiles$ = createEffect(() =>
    this.actions$.pipe(
        ofType(user.GET_All_Users),
        mergeMap(()=> this.httpService.getUsers().pipe(
            map(resp => user.GET_All_Users_Success({resp})),
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
        private router: Router,
        private httpService: UserhttpService
    ) {}
}