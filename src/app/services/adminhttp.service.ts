import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { AdminDraw } from '../models/draw.model';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SystemAccounting } from '../models/user.model';
import { environment } from '../../environments/environment';
import { NativeHelpersService } from './native-helpers.service';

interface httpInterface{
  head: string,
  body: any
}

@Injectable({
  providedIn: 'root'
})
export class AdminhttpService {

  private url = environment.baseUrl+'/admin';
  private baseUrl = environment.baseUrl;
  
  constructor(
    private http: HttpClient,
    private native: NativeHelpersService
  ) { }

  get URL(){
    return this.url;
  }

  getSysAccounting(): Observable<SystemAccounting[]>{
    return this.http.get<SystemAccounting[]>(`${this.baseUrl}/system/account`)
    .pipe(catchError(error => throwError(error.message)));
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

  /**
   * Create from an array of data
   * @param DrawData DataFile
   * @param lottery leidsa by default 
   * @returns Observable
   */
  postDrawDataFile(DrawData: any[], lottery?: string): Observable<DrawResponse>{
    return this.http.post<DrawResponse>(`${this.url}/draw/${lottery || 'leidsa'}/data`, DrawData)
    .pipe(catchError(error => throwError(error.message)))
  }

  /**
   * Create One
   * @param DrawData DataFile
   * @param lottery leidsa by default 
   * @param draw loto by default
   * @returns Observable
   */
  postOneDrawData(DrawData, lottery?: string, draw?: string): Observable<any>{
    return this.http.post(`${this.url}/history/${lottery || 'leidsa'}/${draw || 'loto'}`, DrawData)
    .pipe(catchError(error => throwError(error.message)))
  }

  postOneQuinielaHistoryDraw(DrawData): Observable<any>{
    return this.http.post(`${this.url}/history/quiniela`, DrawData)
    .pipe(catchError(error => throwError(error.message)))
  }

  /**
   * 
   * Delete
   */
  async deleteOneDrawData(id: string) {
    const resp = await this.native.comfirmModal('Al confirmar no se podran reestablecer los datos','Confirmar para borrar');
    if(resp){
      await this.native._loading();
      this.deleteLoto(id).subscribe(_=>{
        this.native._loadingDismiss();
        this.native.showToast('Elemento borrado');
      }, error =>{
        this.native._loadingDismiss();
        this.native.showToast(error);
      })
    }
  }

  private deleteLoto(id): Observable<any>{
    return this.http.delete(`${this.url}/history/leidsa/loto/${id}`).pipe(
      catchError(error => throwError(error.message))
    );
  }

  async deleteOneQuinielaHistoryDraw(id: string) {
    const resp = await this.native.comfirmModal('Al confirmar no se podran reestablecer los datos','Confirmar para borrar');
    if(resp){
      await this.native._loading();
      this.deleteQuiniela(id).subscribe(_=>{
        this.native._loadingDismiss();
        this.native.showToast('Elemento borrado');
      }, error =>{
        this.native._loadingDismiss();
        this.native.showToast(error);
      });
    }
  }

  private deleteQuiniela(id: string): Observable<any>{
    return this.http.delete(`${this.url}/history/quiniela/${id}`).pipe(
      catchError(error => throwError(error.message))
    );
  }

  /**
   * 
   * Get
   */
  getHistoryData(): Observable<DrawResponse>{
    return this.http.get<DrawResponse>(`${this.url}/history/leidsa`)
    .pipe(catchError(error => throwError(error.message)))
  }

  getQuinielaHistoryData(lottery: string, draw: string, last?: boolean): Observable<DrawResponse>{
    return this.http.get<DrawResponse>(`${this.url}/history/quiniela?lottery=${lottery}&draw=${draw}&last=${last}`)
    .pipe(catchError(error => throwError(error.message)))
  }

  getLastLotoHistoryData(): Observable<DrawResponse>{
    return this.http.get<DrawResponse>(`${this.url}/history/leidsa/last/loto`)
    .pipe(catchError(error => throwError(error.message)))
  }
}

interface DrawResponse{msg: string, data: any[]}
