import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { UserModel, userLog } from '../models/user.model';
import { Draw } from '../models/draw.model';

@Injectable({
  providedIn: 'root'
})
export class UserhttpService {

  url = 'http://loter.ddns.net/user';

  constructor(
    private http: HttpClient
  ) { }

  signin(user: userLog): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.url}/signin`, user)
    .pipe(catchError(error => throwError(error)));
  }


  signup(user: userLog): Observable<UserModel>{
    return this.http.post<UserModel>(`${this.url}/signup`, user)
    .pipe(catchError(error => throwError(error)));
  }

  saveDraw(Draw: Draw): Observable<Draw>{
    return this.http.post<Draw>('', Draw)
    .pipe(catchError(error => throwError(error)));
  }

  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.url}/profiles`)
    .pipe(catchError(error => throwError(error)));
  }

  getOneUser(email: string): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.url}/profile/${email}`)
    .pipe(catchError(error => throwError(error)));
  }

  updateUser(user: UserModel, id: string): Observable<UserModel>{
    return this.http.patch<UserModel>(`${this.url}/profile/${id}`, user)
    .pipe(catchError(error => throwError(error)));
  }

  deleteUser(id: string): Observable<UserModel>{
    return this.http.delete<UserModel>(`${this.url}/profile/${id}`)
    .pipe(catchError(error => throwError(error)));
  }

}
