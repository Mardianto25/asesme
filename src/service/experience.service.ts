import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Experiences } from '../models/experience';
import { MasterClassModule } from '../app/class';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  loginService = this.injector.get(LoginService);
  Header= { headers: {Authorization: `Bearer ${this.loginService.getToken()}`}}

  constructor(private http: HttpClient, private _loginService:LoginService,private injector:Injector, private master : MasterClassModule) { 
  }

  getDataExperience():Observable<Experiences[]>{
    return this.http.get<Experiences[]>(this.master.server+'people/experience', this.Header )
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  updateDataExperience(id, data):Observable<Experiences>{
    return this.http.put<any>(this.master.server+`people/experience/update/${id}`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  simpanDataExperience(data):Observable<Experiences>{
    return this.http.post<any>(this.master.server+`people/experience/create`, data, this.Header)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  deleteDataExperience(id):Observable<Experiences>{
    return this.http.delete<any>(this.master.server+`people/experience/delete/${id}`, this.Header)
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
