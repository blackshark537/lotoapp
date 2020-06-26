import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { UserModel, userLog } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserhttpService {

  url = 'http://localhost:3000/user'

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
}
