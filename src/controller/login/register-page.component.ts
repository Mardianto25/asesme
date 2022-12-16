import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterClassModule } from '../../app/class';

@Component({
  selector: 'app-register-page',
  templateUrl: '../../app/login/html/register-page.component.html',
  styleUrls: ['../../app/login/css/register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  FormRegister:FormGroup

  constructor(private fb: FormBuilder, private login:LoginService, private router: Router, private master:MasterClassModule) { 
    this.FormRegister =fb.group({
      'username': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'password': [null, Validators.required],
      're_password': [null, Validators.required]                                                                    
    })
  }

  ngOnInit() {
    
  }

  handleError() {
    this.master.errorValidasi=true;
  }

  register(data){
    this.login.register(data)
    .subscribe(res => {
      this.master.ambilData=res[0];
      console.log(res)
      // this.master.errorValidasi=false;  
      if(res.code==200){
        this.reset;
        this.master.errorValidasi=true;
        this.router.navigate(['login']);
      }else{
        this.master.ambilData=res.message;
        console.log(this.master.ambilData)
        this.master.errorValidasi=false; 
      }
    })
  }

  reset(){
    this.FormRegister.patchValue({
      username:'',
      email:'',
      first_name:'',
      last_name:'',
      password:'',
      re_password:''
    })
  }

}
