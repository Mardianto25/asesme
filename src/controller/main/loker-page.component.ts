import { Component, OnInit } from '@angular/core';
import { CustumerService } from '../../service/custumer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../../service/job.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { MasterClassModule } from '../../app/class';
import { NetworkService } from '../../app/network';

@Component({
  selector: 'app-loker-page',
  templateUrl: '../../app/main/html/loker-page.component.html',
  styleUrls: ['../../app/main/css/loker-page.component.css']
})
export class LokerPageComponent implements OnInit {
  FormJob:FormGroup;
  dataSelect:any;
  detailSelect:any="";
  validation=true;
  dataLoker:any="";
  detailLoker:any="";
  profile=JSON.parse(localStorage.getItem('profile'));
  settings={};
  
  
  constructor(private service: JobService,private fb: FormBuilder, private router:Router, private master:MasterClassModule, private network:NetworkService) { 
    this.FormJob=fb.group({
      'location': [null, Validators.required],
      'position': [null, Validators.required],
      'education': [null, Validators.required]  
    })

    this.settings = {
      singleSelection: true, 
      text:"Semua Posisi",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class-example",
      labelKey: "name",
      searchBy: ['name','capital']
    };

  }


  ngOnInit() {
    this.getDataLoker();
    this.selectJob()
    // console.log(this.master.profile)
  }

  search(data){
    data.position=data.position[0].name;
    this.service.searchDataLanguages(data)
    .subscribe(res => {
      this.dataLoker=res;
      this.detailLoker=this.dataLoker.data;
      
      if(this.detailLoker==""){
        this.validation=false;
        // console.log("Kosong"+ this.validation) 
      }else{
        this.validation=true;
        // console.log(this.validation);
      }
    })
  }

  selectJob(){
    this.service.selectJob()
    .subscribe(res => {
      this.dataSelect=res;
      this.detailSelect=this.dataSelect.data;
      // console.log(res);
    })
  }

  getDataLoker(){
    this.service.getDataJob()
    .subscribe(res => {
      this.dataLoker=res;
      this.detailLoker=this.dataLoker.data;
      this.master.itemsToShow=this.detailLoker.slice(0, this.master.noOfItemsToShowInitially);
    })
  }

  applyBookmart(id){
    let dataBookmart = {
      member_id: this.profile.people_id,
      job_id:id
    }

    this.service.applyBookmart(dataBookmart)
    .subscribe(res => {
      if(res.code===200){
        this.getDataLoker();
      }else{
        console.log("error",)
      }
    })
  }

  tes(loker){
    this.router.navigate(['/main/detail-loker'], { queryParams: loker });
  }


  onScroll() {
    if(this.master.noOfItemsToShowInitially <= this.detailLoker.length) {
      this.master.noOfItemsToShowInitially += this.master.itemsToLoad;
      this.master.itemsToShow = this.detailLoker.slice(0, this.master.noOfItemsToShowInitially);
      console.log("scrolled");
    } else {
      this.master.isFullListDisplayed = true;
    }
  }

}
