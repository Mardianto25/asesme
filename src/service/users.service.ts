import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../models/users';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  soal:string='assets/data/soal.json';
  alat:string='assets/data/alat-tes.json';  
  
  server='https://apidev.asesme.com/v1/';
  
  constructor(private http: HttpClient,private _router: Router, private injector: Injector) { }

  getSoal() {
    return this.http.get(this.soal)
    .pipe(
      map(this.extractData),
      catchError(this.errorHandler)
    );
  }

  getMeme(){
    return this.http.get(this.server+'meme')
    .pipe(
      map(this.extractData),
      catchError(
        this.errorHandler
      )
    )
  }

  getAlatTes(){
    return this.http.get(this.alat)
    .pipe(
      map(this.extractData),
      catchError(this.errorHandler)
    );
  }


  getDataPosts(): Observable<Users[]> {
    return this.http.get<Users[]>('https://apidev.asesme.com/v1/oauth/token')
    .pipe( 
      map(res => res), 
      catchError(
        this.errorHandler
      ))
  }
  
  errorHandler(error: Response){
    return throwError(error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  
}
