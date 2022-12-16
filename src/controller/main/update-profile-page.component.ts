import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CustumerService } from '../../service/custumer.service';
import * as $ from 'jquery';
import { MasterClassModule } from '../../app/class';
@Component({
  selector: 'app-update-profile-page',
  templateUrl: '../../app/main/html/update-profile-page.component.html',
  styleUrls: ['../../app/main/css/update-profile-page.component.css']
})
export class UpdateProfilePageComponent implements OnInit {
  selectedFile:File =null;
  progressStatus:any;
  persen:boolean=true;
  hasil:any="";
  currentJustify = 'start';
  dataCustumer:any;
  detailCustumer:any="";

  constructor(private service: CustumerService, private master:MasterClassModule) { }

  ngOnInit() {
    this.getDataCustomer();
  }
  
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.service.uploadFile(fd)
    .subscribe(event => {
      this.hasil=event;
      console.log("body",this.hasil)
      if(event.type === HttpEventType.UploadProgress){
        this.progressStatus=Math.round(event.loaded / event.total * 100);
        // console.log(this.progressStatus)   
           
      }else if(event.type === HttpEventType.Response){
        if(this.hasil.body.code===200){
          alert('Upload Image Success');
          this.getDataCustomer();
        }else{
          alert('Upload Image Gagal !!!')          
        }   
      }
    })
  }

  getDataCustomer(){
    this.service.getDataCustomers()
    .subscribe(res => {
      this.dataCustumer=res;
      this.detailCustumer=this.dataCustumer.data;
    })
  }

}
