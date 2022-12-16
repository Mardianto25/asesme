import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Users } from '../models/users';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { MasterClassModule } from '../app/class';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  loginService = this.injector.get(LoginService);
  Header= { headers: {Authorization: `Bearer ${this.loginService.getToken()}`}}

  constructor(private http: HttpClient, private _loginService:LoginService,private injector:Injector, private master:MasterClassModule) { 

  }

  getDataPesan():Observable<any>{
    return this.http.get<any>(this.master.server+'people/message/index', this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  getDetailPesan(id):Observable<any>{
    return this.http.get<any>(this.master.server+`people/message/chatting/${id}`, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  kirimPesan(data):Observable<any>{
  return this.http.post<any>(this.master.server+`people/message/chatting/store`,data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  updateStatusPesan(id, data):Observable<any>{
    return this.http.post<any>(this.master.server+`people/message/chatting/read/${id}`,data, this.Header)
      .pipe(
        map(res => res),
        catchError(
          this.errorHandler
        )
      ) 
    }


  errorHandler(error: Response){
    // console.log(error);
    return throwError(error);
  }

  private extractData(res: Response) {
    // if (res.status < 200 || res.status >= 300) {
    //   throw new Error('Bad response status: ' + res.status);
    // }
    let body = res;
    return body || { };
  }
}
