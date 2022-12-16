import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { MasterClassModule } from '../../app/class';

@Component({
  selector: 'app-main-beranda-page',
  templateUrl: '../../app/login/html/main-beranda-page.component.html',
  styleUrls: ['../../app/login/css/main-beranda-page.component.css']
})
export class MainBerandaPageComponent implements OnInit {
  
  public user:any= SocialUser;
  usernameData:any;
  constructor(private _login:LoginService, private router:Router, private socialAuthService: AuthService, private master:MasterClassModule) { }

  ngOnInit() {
    // if(JSON.parse(localStorage.getItem('profile'))==null){
    //   this.profile.username=="Action";
    // }else{
    //   this.profile = JSON.parse(localStorage.getItem('profile'));
    //   console.log(this.profile);
    // }
    // this.usernameData=JSON.parse(this._login.getProfile());
  }

  Url(){
    this.router.navigate(['main/update-profile'])
  }
  pesanUrl(){
    this.router.navigate(['main/me/chat'])
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform+" sign in data : " , userData);
  
          let data ={
            "expires_in":5184000,
            "access_token":userData.token,
            "token_type": "Bearer"
          }
          console.log("Facebook", data)
          this._login.loginFacebook(data)
          .subscribe(res => {
            this.master.validasiLogin=res;
            if(this.master.validasiLogin.code===200){
              localStorage.setItem('token', this.master.validasiLogin.data.access_token);
              // localStorage.setItem('profile', this.master.validasiLogin.data.result);
              this.router.navigate(['main/me/dashboard']);
              console.log(res);
            }else{
              this.router.navigate(['main/beranda'])         
            }
          })
          
        }
      );
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform+" sign in data : " , userData);
          let data ={
            "expires_in":3600,
            "access_token":userData.token,
            "scope": "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
            "token_type": "Bearer",
            "id_token": userData.idToken,
            "created": userData.id
          }
  
          this._login.loginGoogle(data)
          .subscribe(res => {
            this.master.validasiLogin=res;
            if(this.master.validasiLogin.code===200){
              localStorage.setItem('token', this.master.validasiLogin.data.access_token);
              this.router.navigate(['main/me/dashboard']);
              console.log(res);
            }else{
              this.router.navigate(['main/beranda'])         
            }
          })
          
        }
      );
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    
  }

}
