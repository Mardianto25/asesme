import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import iziModal from 'izimodal/js/iziModal';
import { AlatTesService } from '../../service/alat-tes.service';
import { UsersService } from '../../service/users.service';
import { JobService } from '../../service/job.service';
import { FilterPipe } from '../../app/filter.pipe';
import { filter, switchMap } from 'rxjs/operators' 
import { MasterClassModule } from '../../app/class';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: '../../app/main/html/dashboard-page.component.html',
  styleUrls: ['../../app/main/css/dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  rForm: FormGroup;
  slideBuy=[];
  slideFree=[];
  meme:any;
  memeDetail:any;
  job:any;
  jobDetail:any;
  CekOrTest:any;
  CekOrTestDetail:any="";
  validasiModal='false';
  paramId:any;
  closeResult="";
 
  constructor(private _alatTes:AlatTesService,private router:Router, private fb: FormBuilder,private modalService: NgbModal, private _user:UsersService, private _job: JobService, private master:MasterClassModule ) { 
    
    this.rForm=fb.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required]
    });
    
  }

  ngOnInit() {
    this.getAlatTes();
    this.getMeme();
    this.getJob();
  
  }

  getAlatTes(){
    this._alatTes.getDataAlatTes()
    .subscribe(res => {
      this.master.ambilData=res;
      
      for(var i = 0; i <= this.master.ambilData.data.length; i++){
        if(this.master.ambilData.data[i].price!=0){
          this.slideBuy.push(this.master.ambilData.data[i]);
        }else{
          this.slideFree.push(this.master.ambilData.data[i]);
        }
      }
    })
  }

  refresh(){

  }

  getCekOrTest(id,content){
    this.paramId=id;
    this._alatTes.getCekOrTest(id)
    .subscribe(res => {
      this.CekOrTest=res;
      if(this.CekOrTest.code===200){
        this.CekOrTestDetail=this.CekOrTest.data;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }else{
        alert("error");
      }
    })
  }

  getMeme(){
    this._user.getMeme()
    .subscribe(res => {
      this.meme=res;
      this.memeDetail=this.meme.data;
    })
  }
  getJob(){
    this._job.getDataJob()
    .subscribe( res => {
      this.job=res;
      this.jobDetail=this.job.data;
    })
  }

  postFreeTes(data, content){
    this._alatTes.getFreeTes(this.paramId, data)
    .subscribe(res=>{
      console.log(res);
      this.getCekOrTest(this.paramId, content);
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
