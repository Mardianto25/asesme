import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { LoginService } from '../../service/login.service';
import { MasterClassModule } from '../../app/class';

@Component({
  selector: 'app-login-page',
  templateUrl: '../../app/login/html/login-page.component.html',
  styleUrls: ['../../app/login/css/login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  public user:any= SocialUser;
  rForm:FormGroup;
  alert=true;

  constructor(private socialAuthService: AuthService,private _service:LoginService, private fb:FormBuilder, private _router: Router, private _route:ActivatedRoute, private master:MasterClassModule) { 
    this.rForm =fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]                                                                    
    })
  }

  ngOnInit() {

  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this._router.navigate(['me/dashboard'])
      }
    );
  }

  register(){
    this._router.navigate(['/register'])
  }

  kembali(){
    this._router.navigate(['main/beranda'])
  }

  lupaPassword(){
    this._router.navigate(['/lupa-password'])
  }

  loginManual(dataLogin){
    let data ={
      "grant_type":"password",
      "client_id":"2",
      "client_secret":"vLA7NscY5xs6kjjsg5T9adbf0yOZT5eTIPkNYGna",
      "username":dataLogin.username,
      "password":dataLogin.password
    }
    
    this._service.loginManual(data)
    .subscribe(res => {
        this.master.validasiLogin=res;
        if(this.master.validasiLogin.access_token!=""){
          localStorage.setItem('token', res.access_token)
          this._router.navigate(['main/me/dashboard'])
        }else{
          console.log("error");
          this.alert=false;
        } 
      }, 
      error => this.alert=false
    );
  }

  alertStatus(){
    this.alert=true;
  }
  
}
