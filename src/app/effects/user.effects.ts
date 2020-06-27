import { Injectable } from '@angular/core';
import { UserhttpService } from '../services/userhttp.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as user from '../actions/user.actions';
import { of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError } from 'rxjs/operators'

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

    constructor(
        private actions$: Actions,
        private httpService: UserhttpService
    ) {}
}