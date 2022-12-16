import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Users } from '../models/users';
import { map, catchError } from 'rxjs/operators';
import { MasterClassModule } from '../app/class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private _router: Router, private injector: Injector, private master:MasterClassModule) { 

  }

  loginManual(users: Users): Observable<any>{
    return this.http.post(this.master.server+`oauth/token`, users)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  lupaPassword(data):Observable<any>{
    return this.http.post(this.master.server+'me-password/reset', data)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    )
  }

  loginGoogle(data):Observable<any>{
    return this.http.post(this.master.server+`people/sign-social-media/google`, data)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  loginFacebook(data):Observable<any>{
    return this.http.post(this.master.server+`people/sign-social-media/facebook`, data)
    .pipe(
      map(res => res),
      catchError(
        this.errorHandler
      )
    ) 
  }

  // 
  register(data):Observable<any> {
    return this.http.post(this.master.server+`people/register`, data)
    .pipe(
      map(res=>res),
      catchError(
        this.errorHandler
      )
    )
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getProfile(){
    let data;
    if(data==null){
      data=JSON.parse(localStorage.getItem('profile'));
    }else{
      data=JSON.parse(localStorage.getItem('profile'));
    }
    return data.username;
  }

  getToken(){
   return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('profile');  
    window.location.reload();  
    this._router.navigate(['main/beranda'])
    
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
