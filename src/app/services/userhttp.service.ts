import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { UserModel, userLog } from '../models/user.model';
import { Draw } from '../models/draw.model';

export interface DateDto{day: number, month: number, year: number};

@Injectable({
  providedIn: 'root'
})
export class UserhttpService {

  //private url = 'http://loter.ddns.net/user';
  private url = 'http://localhost:3000/user';


  constructor(
    private http: HttpClient
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
      } else {
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
        return throwError('Ha ocurrido un error desconocido: ' + e.message);
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
    return this.http.post<Draw>(`${this.url}/draw`, Draw)
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

  getDrawsByDate(date: DateDto): Observable<Draw[]>{
    return this.http.get<Draw[]>(`${this.url}/draws/date/${date.day}/${date.month}/${date.year}`)
      .pipe(catchError(error => throwError(error.message)));
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
      throwError(error.message);
  }
}
