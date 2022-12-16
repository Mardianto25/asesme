import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Jobs } from '../models/job';
import { MasterClassModule } from '../app/class';
import { environment } from '../environments/environment';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class JobService {

  loginService = this.injector.get(LoginService);
  Header= { headers: {Authorization: `Bearer ${this.loginService.getToken()}`}}
  
  constructor(private http: HttpClient, private _loginService:LoginService,private injector:Injector) { 

  }
  
  getDataJob(): Observable<Jobs[]>{
    return this.http.get<Jobs[]>(API_URL+'job', this.Header )
    .pipe(
      map(response => response),
      catchError(this.errorHandler)
    ) 
  }

  getDataJobDetail(id): Observable<Jobs[]>{
    return this.http.get<Jobs[]>(API_URL+`job/show/${id}`, this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  getDataJobBookmart(id): Observable<any>{
    return this.http.get<any>(API_URL+`bookmark/${id}`, this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  getDataJobApply(id): Observable<any>{
    return this.http.get<any>(API_URL+`job-apply/${id}`, this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  applyJob(data):Observable<any>{
    return this.http.post<any>(API_URL+'job-apply', data, this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }


  applyBookmart(data):Observable<any>{
    return this.http.post<any>(API_URL+'bookmark', data, this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  deleteBookmart(id):Observable<any>{
    return this.http.delete<any>(API_URL+`bookmark/delete/${id}`, this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  // bookmark/delete/77150488442
  selectJob(): Observable<Jobs[]>{
    return this.http.get<Jobs[]>(API_URL+'job/select-options', this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  searchDataLanguages(data):Observable<Jobs>{
    return this.http.post<any>(API_URL+`job/search`, data, this.Header)
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
