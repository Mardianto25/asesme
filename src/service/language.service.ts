import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Languages } from '../models/language';
import { MasterClassModule } from '../app/class';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  loginService = this.injector.get(LoginService);
  Header= { headers: {Authorization: `Bearer ${this.loginService.getToken()}`}}
  
  constructor(private http: HttpClient, private _loginService:LoginService,private injector:Injector, private master:MasterClassModule) { 

  }

  getDataLanguages():Observable<Languages[]>{
    return this.http.get<Languages[]>(this.master.server+'people/language', this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  updateDataLanguages(id, data):Observable<Languages>{
    return this.http.put<any>(this.master.server+`people/language/update/${id}`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  simpanDataLanguages(data):Observable<Languages>{
    return this.http.post<any>(this.master.server+`people/language/create`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  deleteDataLanguages(id):Observable<Languages>{
    return this.http.delete<any>(this.master.server+`people/language/delete/${id}`, this.Header)
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
