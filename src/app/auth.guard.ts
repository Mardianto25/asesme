import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';
import { MasterClassModule } from './class';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginService, private _router:Router, private master:MasterClassModule){

  }
  canActivate(): boolean{
    if(this.service.getToken()){
      return true
    }else{
      this._router.navigate(['/main/beranda'])
      return false
    }
  }
}
