import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customers } from '../models/customers';
import { MasterClassModule } from '../app/class';
import { environment } from '../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CustumerService {
  loginService = this.injector.get(LoginService);
  Header= { headers: {Authorization: `Bearer ${this.loginService.getToken()}`}}
  
  constructor(private http: HttpClient, private _loginService:LoginService,private injector:Injector, private master:MasterClassModule) { 

  }
  
  getDataCustomers():Observable<Customers[]>{
    return this.http.get<Customers[]>(API_URL+'people/get-detail-user', this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  getProvinsi():Observable<any>{
    return this.http.get<any>(API_URL+`people/province`)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  getKota(id):Observable<any>{
    return this.http.get<any>(API_URL+`people/regency/${id}`)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  getJobPosition(id): Observable<any>{
    return this.http.get<any>(API_URL+`people/job-position/${id}`)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    )
  }

  getJobCatPosition(): Observable<any>{
    return this.http.get<any>(API_URL+`people/job-position-category`)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    )
  }

  updateDataCustomers(id, data):Observable<Customers>{
    return this.http.put<any>(API_URL+`people/update/${id}`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }
  
  uploadFile(data){
    return this.http.post(API_URL+'people/update/photo-profile',data, {
        headers: { 
         Authorization: `Bearer ${this. loginService.getToken()}`
        },
        observe:'events',
        reportProgress:true
      })
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
