import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { AlatTesService } from '../../service/alat-tes.service';
import { MasterClassModule } from '../../app/class';


@Component({
  selector: 'app-home-page',
  templateUrl: '../../app/login/html/all-tes-page.component.html',
  styleUrls: ['../../app/login/css/all-tes-page.component.css']
})
export class AllTesPageComponent implements OnInit {
  slideBuy=[];
  slideFree=[];
  constructor(private router:Router, private _alatTes:AlatTesService, private master:MasterClassModule) { }

  ngOnInit() {
    this.getAlatTes();
  }

  Url(){
    this.router.navigate(['main/update-profile'])
  }
  pesanUrl(){
    this.router.navigate(['main/chat'])
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


}
