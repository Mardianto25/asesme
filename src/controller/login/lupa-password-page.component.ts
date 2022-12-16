import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lupa-password-page',
  templateUrl: '../../app/login/html/lupa-password-page.component.html',
  styleUrls: ['../../app/login/css/lupa-password-page.component.css']
})
export class LupaPasswordPageComponent implements OnInit {
  rForm:FormGroup;
  
  constructor(private fb: FormBuilder, private _login:LoginService, private router:Router) { 
    this.rForm =fb.group({
      'email': [null, Validators.required]    
    })
  }

  ngOnInit() {
  }

  lupaPassword(email){
    this,this._login.lupaPassword(email)
    .subscribe(res =>{
      if(res.code===200){
        console.log("succes", res);
        this.router.navigate(['home/beranda'])
      }else{
        console.log("error")
      }
    })
    
  }
}
