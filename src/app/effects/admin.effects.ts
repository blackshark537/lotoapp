import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import * as adminActions from '../actions/admin_draw.action';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { AdminhttpService } from '../services/adminhttp.service';
import { of } from 'rxjs';

@Injectable()
export class AdminEffects{

    loadDraws$ = createEffect(()=>
        this.actions$.pipe(
            ofType(adminActions.GET),
            exhaustMap(()=>
             this.adminService.getDraws().pipe(
                map((resp)=> adminActions.HttpResponse({draws: resp.body})),
                catchError(error => of(adminActions.Error({error})))
             )
            )
        )
    );

    createDraw$ = createEffect(()=>
        this.actions$.pipe(
            ofType(adminActions.SAVE),
            exhaustMap(payload => this.adminService.createDraw(payload).pipe(
                map(resp => adminActions.GET()),
                catchError(error => of(adminActions.Error({error})))
            ))
        )
    );

    patchDraw$ = createEffect(() =>
        this.actions$.pipe(
            ofType(adminActions.EDIT),
            exhaustMap(payload => this.adminService.updateDraw(payload.Draw).pipe(
                map(resp => adminActions.GET()),
                catchError(error => of(adminActions.Error({error})))
            ))
        )
    );

    deleteDraw$ = createEffect(() => 
        this.actions$.pipe(
            ofType(adminActions.DEL),
            exhaustMap(payload => this.adminService.deleteDraw(payload.id).pipe(
                map(resp => adminActions.GET()),
                catchError(error => of(adminActions.Error({error})))
            ))
        )
    );

    constructor(
        private adminService: AdminhttpService,
        private actions$: Actions
    ) {}
}