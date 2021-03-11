import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, shareReplay } from 'rxjs/operators';
import { UserModel, userLog, UserAccounting } from '../models/user.model';
import { Draw } from '../models/draw.model';
import { NativeHelpersService } from './native-helpers.service';
import { UpdateUserInterface } from '../models/user.model';

export interface DateDto{day: number, month: number, year: number};

@Injectable({
  providedIn: 'root'
})
export class UserhttpService {

  /* private url = 'http://loter.ddns.net/user';
  private baseUrl = 'http://loter.ddns.net'; */
  private url = 'http://localhost:3000/user';
  private baseUrl = 'http://localhost:3000';

  public draw$ = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private native: NativeHelpersService
  ) { }
/* //================================================================================//
              USER ROUTES
//================================================================================// */
  signin(user: userLog): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.url}/signin`, user)
    .pipe(catchError(error => {
      const e: HttpErrorResponse = error;
      if(e.status === 404){
        return throwError('Este usuario no existe');
      } else if(e.status === 401){
        return throwError('Este usuario no existe');
      } else if(e.status === 400){
        return throwError('La contraseña es incorrecta');
      } else if(e.status === 403){
        return throwError('Acceso prohibido: '+ e.error.message);
      }else {
        console.log(e);
        return throwError('Ha ocurrido un error desconocido: ' + e.message);
      }
    }));
  }


  signup(user: userLog): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.url}/signup`, user)
    .pipe(catchError(error => {
      const e: HttpErrorResponse = error;
      if(e.status === 400){
        return throwError('El email de usuario ya existe, por favor utilize otro email');
      } else {
        return throwError('Ha ocurrido un error desconocido: ' + e.error.message);
      }
    }));
  }

  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.url}/profiles`)
    .pipe(catchError(error => throwError(error.message)));
  }

  getOneUser(): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}/profile`)
    .pipe(catchError(error => throwError(error.message)));
  }

  getPopulateUser(): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}/profile/populated`)
    .pipe(catchError(error => throwError(error.message)));
  }

  getAccountInfo(email: string): Observable<UserAccounting[]>{
    return this.http.get<UserAccounting[]>(`${this.baseUrl}/account/user/${email}`)
    .pipe(catchError(error => throwError(error.message)));
  }

  updateCredits(userPreferences: UpdateUserInterface): Observable<UserModel>{
    return this.http.put<UserModel>(`${this.url}/profile/credits`, userPreferences)
    .pipe(catchError(error => throwError(error.message)));
  }

  updateUser(user: UserModel): Observable<UserModel>{
    const id = user._id;
    user = {...user};
    delete user._id;
    return this.http.patch<UserModel>(`${this.url}/profile/${id}`, user)
    .pipe(catchError(error => throwError(error.message)));
  }

  chargeUser(ballsQty: number, price: number): Observable<UserModel>{
    return this.http.patch<UserModel>(`${this.url}/profile/charge/${ballsQty}/${price}`, {})
    .pipe(catchError(error => throwError(error.message)));
  }

  deleteUser(id: string): Observable<UserModel>{
    return this.http.delete<UserModel>(`${this.url}/profile/${id}`)
    .pipe(catchError(error => throwError(error.message)));
  }
/* //================================================================================//
            DRAW ROUTES
//================================================================================// */
  saveDraw(Draw: Draw): Observable<Draw>{
    return this.http.post<Draw>(`${this.url}/create_draw/id/gametype`, null)
    .pipe(catchError(error => throwError(error.message)));
  }

  saveDrawByDate(Draw: Draw): Observable<Draw>{
    return this.http.post<Draw>(`${this.url}/draw/by/date`, Draw)
    .pipe(catchError(error => throwError(error.message)));
  }

  getDrawById(id: string): Observable<Draw>{
    return this.http.get<Draw>(`${this.url}/draw/${id}`)
      .pipe(catchError(error => throwError(error.message)));
  }

  getTodayDraws(): Observable<Draw[]>{
    return this.http.get<Draw[]>(`${this.url}/draws/today`)
      .pipe(catchError(error => throwError(error.message)));
  }

  getDrawsByDate(date: DateDto): Observable<Draw[]>{
    return this.http.get<Draw[]>(`${this.url}/draws/today`)
      .pipe(catchError(error => throwError(error.message)));
  }

  getDraws(): Observable<any>{
    return this.http.get<any>(`${this.url}/draws`).pipe(
    shareReplay(1),
    catchError(error => throwError(error.message)));
  }

  createDraw(admin_draw_id: string, draw_type: number): Observable<DrawResp>{
    return this.http.post<DrawResp>(`${this.url}/create_draw/${admin_draw_id}/${draw_type}`, null)
      .pipe(catchError(error => this.sendError(error)));
  }

  favoriteDraw(Draw: Draw): Observable<Draw>{
    const id = Draw._id;
    Draw = {...Draw};
    Draw.favorite = !Draw.favorite;
    delete Draw._id;
    return this.http.patch<Draw>(`${this.url}/draw/${id}`, Draw)
    .pipe(catchError(error => throwError(error.message)));
  }

  updateDraw(Draw: Draw): Observable<any>{
    const id = Draw._id;
    Draw = {...Draw};
    delete Draw._id;
    return this.http.patch<any>(`${this.url}/draw/${id}`, Draw)
    .pipe(catchError(error => throwError(error.message)));
  }

  deleteDraw(Draw: Draw): Observable<Draw>{
    const id = Draw._id;
    Draw = {...Draw};
    delete Draw._id;
    return this.http.delete<Draw>(`${this.url}/draw/${id}`)
    .pipe(catchError(error => throwError(error.message)));
  }

  sendError(error: HttpErrorResponse) {
      this.native.showError(error.error.message);
      this.native.showToast(error.error.message);
      return throwError(error);
  }
}

interface DrawResp{head: string; body: {Data: any[], ballsqty: number}}