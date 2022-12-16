import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Certificates } from '../models/certificate';
import { MasterClassModule } from '../app/class';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  loginService = this.injector.get(LoginService);
  Header= { headers: {Authorization: `Bearer ${this.loginService.getToken()}`}}

  constructor(private http: HttpClient, private _loginService:LoginService,private injector:Injector, private master:MasterClassModule) { 

  }

  getDataCertificates():Observable<Certificates[]>{
    return this.http.get<Certificates[]>(this.master.server+'people/certificate', this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  updateDataCertificates(id, data):Observable<Certificates>{
    return this.http.put<any>(this.master.server+`people/certificate/update/${id}`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  simpanDataCertificates(data):Observable<Certificates>{
    let loginService = this.injector.get(LoginService);
    return this.http.post<any>(this.master.server+`people/certificate/create`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  deleteDataCertificates(id):Observable<Certificates>{
    let loginService = this.injector.get(LoginService);
    return this.http.delete<any>(this.master.server+`people/certificate/delete/${id}`, this.Header)
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
