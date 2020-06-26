import { createAction, props } from '@ngrx/store';
import { AdminDraw } from '../models/draw.model';

export const GET = createAction('[Admin] get all draws');
export const EXIT = createAction('[Admin] exit and saving state');
export const SAVE = createAction('[Admin] save draw', props<AdminDraw>());
export const EDIT = createAction('[Admin] edit draw', props<{index: number; Draw: AdminDraw}>());
export const DEL = createAction('[Admin] delete draw', props<{index: number}>());
export const HttpResponse = createAction('[Admin] success response', props<{draws: AdminDraw[]}>());
export const Error = createAction('[Admin] error response', props<{error: any}>());