import { Component, OnInit } from '@angular/core';
import { CustumerService } from '../../service/custumer.service';
import { LoginService } from '../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterClassModule } from '../../app/class';

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: '../../app/side-bar/html/sidebar-profile.component.html',
  styleUrls: ['../../app/side-bar/css/sidebar-profile.component.css']
})
export class SidebarProfileComponent implements OnInit {
  selectedFile:File =null;
  custumerData:any="";
  custumerDetail:any="";
  
  constructor(private service: CustumerService, private _login: LoginService, private router:Router, private master:MasterClassModule) { }

  ngOnInit() {
    this.getDataCustomer();
  }

  urlProfile(){
      this.router.navigate(['../update-profile'])
  }

  urlChat(){
    this.router.navigate(['./chat'])
  }

  urlLokerPilihan(){
    this.router.navigate(['./loker-pilihan'])
  }

  validasiJk(data){
    if(data.gender=="M"){
      data.gender="Laki-Laki";
    }else{
      data.gender="Perempuan";
    }
  }

  getDataCustomer(){
    this.service.getDataCustomers()
    .subscribe(res => {
      this.custumerData=res;
      this.custumerDetail=this.custumerData.data;
      this.validasiJk(this.custumerDetail)
      let data=this.custumerDetail;
      localStorage.setItem('profile', JSON.stringify(data));
    })
  }
}
