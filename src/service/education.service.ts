import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Educations } from '../models/education';
import { MasterClassModule } from '../app/class';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  loginService = this.injector.get(LoginService);
  Header= { headers: {Authorization: `Bearer ${this.loginService.getToken()}`}}
  
  constructor(private http: HttpClient, private _loginService:LoginService,private injector:Injector, private master:MasterClassModule) { 

  }

  getDataEducation():Observable<Educations[]>{
    let loginService = this.injector.get(LoginService);
    return this.http.get<Educations[]>(this.master.server+'people/education', this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }


  updateDataEducations(id, data):Observable<Educations>{
    return this.http.put<any>(this.master.server+`people/education/update/${id}`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  simpanDataEducations(data):Observable<Educations>{
    return this.http.post<any>(this.master.server+`people/education/create`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  deleteDataEducations(id):Observable<Educations>{
    return this.http.delete<any>(this.master.server+`people/education/delete/${id}`, this.Header)
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
