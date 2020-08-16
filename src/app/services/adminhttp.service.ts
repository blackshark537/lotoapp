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

  private url = 'http://loter.ddns.net/admin';
  //private url = 'http://localhost:3000/admin';
  
  constructor(
    private http: HttpClient
  ) { }

  get URL(){
    return this.url;
  }

  getDraws(): Observable<httpInterface>{
    return this.http.get<httpInterface>(`${this.url}/draws`)
    .pipe(catchError(error => throwError(error.message)));
  }

  getDraw(id: string): Observable<AdminDraw>{
    return this.http.get<AdminDraw>(`${this.url}/draw/${id}`)
    .pipe(catchError(error => throwError(error.message)));
  }

  createDraw(draw: AdminDraw): Observable<AdminDraw>{
    const copy = {...draw};
    delete copy._id;
    return this.http.post<AdminDraw>(`${this.url}/draw`, copy)
    .pipe(catchError(error => throwError(error.message)));
  }

  updateDraw(draw: AdminDraw): Observable<AdminDraw>{
    let drawCopy = {...draw};
    const id = drawCopy._id;
    delete drawCopy._id;
    return this.http.patch<AdminDraw>(`${this.url}/draw/${id}`, drawCopy)
    .pipe(catchError(error => throwError(error.message)));
  }

  deleteDraw(id: string): Observable<AdminDraw>{
    return this.http.delete<AdminDraw>(`${this.url}/draw/${id}`)
    .pipe(catchError(error => throwError(error.message)));
  }
}
