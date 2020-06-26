import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AdminDraw, Draw } from '../models/draw.model';
import { catchError } from 'rxjs/operators';

interface httpInterface{
  head: string,
  body: any
}

@Injectable({
  providedIn: 'root'
})
export class AdminhttpService {

  url = 'http://localhost:3000/admin';

  constructor(
    private http: HttpClient
  ) { }

  getDraws(): Observable<httpInterface>{
    return this.http.get<httpInterface>(`${this.url}/draws`)
    .pipe(catchError(error => throwError(error)));
  }

  getDraw(id: string): Observable<AdminDraw>{
    return this.http.get<AdminDraw>(`${this.url}/draw/${id}`)
    .pipe(catchError(error => throwError(error)));
  }

  createDraw(draw: AdminDraw): Observable<AdminDraw>{
    const copy = {...draw};
    delete copy._id;
    return this.http.post<AdminDraw>(`${this.url}/draw`, copy)
    .pipe(catchError(error => throwError(error)));
  }

  updateDraw(draw: AdminDraw, id: string): Observable<AdminDraw>{
    return this.http.patch<AdminDraw>(`${this.url}/draw/${id}`, draw)
    .pipe(catchError(error => throwError(error)));
  }

  deleteDraw(id: string): Observable<AdminDraw>{
    return this.http.delete<AdminDraw>(`${this.url}/draw/${id}`)
    .pipe(catchError(error => throwError(error)));
  }
}
