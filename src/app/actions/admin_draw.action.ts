import { createAction, props } from '@ngrx/store';
import { Draw, AdminDraw } from '../models/draw.model';

export const GET = createAction('[Admin] get all draws');
export const EXIT = createAction('[Admin] exit and saving state');
export const SAVE = createAction('[Admin] save draw', props<AdminDraw>());
export const EDIT = createAction('[Admin] edit draw', props<{index: number; Draw: AdminDraw}>());
export const DEL = createAction('[Admin] delete draw', props<{index: number}>());
