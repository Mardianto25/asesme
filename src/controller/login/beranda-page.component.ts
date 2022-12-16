import { Component, OnInit } from '@angular/core';
import { AlatTesService } from '../../service/alat-tes.service';
import { Router } from '@angular/router';
import {
  AuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { LoginService } from '../../service/login.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MasterClassModule } from '../../app/class';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-beranda-page',
  templateUrl: '../../app/login/html/beranda-page.component.html',
  styleUrls: ['../../app/login/css/beranda-page.component.css']
})
export class BerandaPageComponent implements OnInit {
  public user:any= SocialUser;
  slideConfig=this.master.slideConfig; 
  slideBuy=[];
  slideFree=[];
  rForm:FormGroup;
  alert=true;
  
  constructor(private _alatTes:AlatTesService, private fb:FormBuilder,private _service:LoginService, private router:Router, private socialAuthService: AuthService, private master:MasterClassModule) { 
    this.rForm =fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]                                                                    
    })
    
  }

  ngOnInit() {
    this.getAlatTes();
  }

  isFieldValid(field: string) {
    return !this.rForm.get(field).valid && this.rForm.get(field).touched;
  }
  
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit(data) {
    if (this.rForm.valid) {
      this.loginManual(data)
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
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
          this._service.loginFacebook(data)
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
  
          this._service.loginGoogle(data)
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
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    
  }

  getAlatTes(){
    this._alatTes.getDataAlatTes()
    .subscribe(res => {
      this.master.ambilData=res;
      for(var i = 0; i <=this.master.ambilData.data.length; i++){
        if(this.master.ambilData.data[i].price!=0){
          this.slideBuy.push(this.master.ambilData.data[i]);
        }else{
          this.slideFree.push(this.master.ambilData.data[i]);
        }
        
      }   
    })
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
        if(res.access_token!=""){
          localStorage.setItem('token', res.access_token)
          this.router.navigate(['main/me/dashboard'])
        }else{
          this.alert=false;
          // this.router.navigate(['main/beranda'])            
        }
      },
      error => this.alert=false
    )
  }

  lihatDetail(){
    this.router.navigate(['main/all-tes']);
  }

  alertStatus(){
    this.alert=true;
  }

}
