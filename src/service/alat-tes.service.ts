import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlatTes } from '../models/alat-tes';
import { MasterClassModule } from '../app/class';
import { environment } from '../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AlatTesService {
  loginService = this.injector.get(LoginService);
  Header= { headers: {Authorization: `Bearer ${this.loginService.getToken()}`}}

  constructor(private http: HttpClient, private _loginService:LoginService,private injector:Injector, private master:MasterClassModule) { 

  }

  getDataAlatTes():Observable<AlatTes[]>{
    // let loginService = this.injector.get(LoginService);
    return this.http.get<AlatTes[]>(API_URL+'product/test-tools')
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  getDataAlatTesDetail(id):Observable<AlatTes[]>{
    return this.http.get<AlatTes[]>(API_URL+`product/test-tools-detail/${id}`)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  updateDataAlatTes(id, data):Observable<AlatTes>{
    return this.http.put<any>(API_URL+`people/test-tools/update/${id}`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  simpanDataAlatTes(data):Observable<AlatTes>{
    return this.http.post<any>(API_URL+`people/test-tools/create`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  deleteDataAlatTes(id):Observable<AlatTes>{
    return this.http.delete<any>(API_URL+`people/test-tools/delete/${id}`, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  /// Get Free Test
  getCekOrTest(id):Observable<any>{
    return this.http.get<any>(API_URL+`people/check-our-test/${id}`, this.Header)
    .pipe(
      map(res => res),
      catchError( this.errorHandler)
    )
  }

  getFreeTes(id, data):Observable<AlatTes>{
    return this.http.post<any>(API_URL+`people/free-order/${id}`, data, this.Header)
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
