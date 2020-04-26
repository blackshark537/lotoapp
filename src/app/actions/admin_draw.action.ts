import { createAction, props } from '@ngrx/store';
import { Draw } from '../models/draw.model';

export const GET = createAction('[Admin] get all draws');
export const EXIT = createAction('[Admin] exit and saving state');
export const SAVE = createAction('[Admin] save draw', props<Draw>());
export const EDIT = createAction('[Admin] edit draw', props<{index: number; Draw: Draw}>());
export const DEL = createAction('[Admin] delete draw', props<{index: number}>());
