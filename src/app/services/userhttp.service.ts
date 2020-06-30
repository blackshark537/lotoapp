import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { UserModel, userLog } from '../models/user.model';
import { Draw } from '../models/draw.model';

@Injectable({
  providedIn: 'root'
})
export class UserhttpService {

  //url = 'http://loter.ddns.net/user';
  private url = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient
  ) { }

  signin(user: userLog): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.url}/signin`, user)
    .pipe(catchError(error => {
      const e: HttpErrorResponse = error;
      if(e.status === 401){
        return throwError('Este usuario no existe')
      } else if(e.status === 400){
        return throwError('La contraseña es incorrecta')
      }
    }));
  }


  signup(user: userLog): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.url}/signup`, user)
    .pipe(catchError(error => {
      const e: HttpErrorResponse = error;
      if(e.status === 400){
        return throwError('El email de usuario ya existe, por favor utilize otro email')
      }
    }));
  }

  saveDraw(Draw: Draw): Observable<Draw>{
    return this.http.post<Draw>(`${this.url}/draw`, Draw)
    .pipe(catchError(error => throwError(error)));
  }

  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.url}/profiles`)
    .pipe(catchError(error => throwError(error)));
  }

  getOneUser(): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}/profile`)
    .pipe(catchError(error => throwError(error)));
  }

  updateUser(user: UserModel): Observable<UserModel>{
    const id = user._id;
    user = {...user};
    delete user._id;
    return this.http.patch<UserModel>(`${this.url}/profile/${id}`, user)
    .pipe(catchError(error => throwError(error)));
  }

  deleteUser(id: string): Observable<UserModel>{
    return this.http.delete<UserModel>(`${this.url}/profile/${id}`)
    .pipe(catchError(error => throwError(error)));
  }

}
