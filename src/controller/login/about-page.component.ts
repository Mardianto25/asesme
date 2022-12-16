import { Component, OnInit } from '@angular/core';
import { MasterClassModule } from '../../app/class';
import { AlatTesService } from '../../service/alat-tes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-page',
  templateUrl: '../../app/login/html/about-page.component.html',
  styleUrls: ['../../app/login/css/about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  slideBuy=[];
  slideFree=[];
  constructor(private master:MasterClassModule, private _alatTes:AlatTesService, private router:Router) { }

  ngOnInit() {
    this.getAlatTes();
  }
  allTes(){
    this.router.navigate(['home/all-tes'])
  }

  home(){
    this.router.navigate(['home/beranda'])
  }
  getAlatTes(){
    this._alatTes.getDataAlatTes()
    .subscribe(res => {
      
      this.master.ambilData=res;
      console.log(this.master.ambilData)
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
