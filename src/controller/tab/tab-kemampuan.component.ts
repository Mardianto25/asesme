import { Component, OnInit } from '@angular/core';
import { CustumerService } from '../../service/custumer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SkillService } from '../../service/skill.service';
import * as $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tab-kemampuan',
  templateUrl: '../../app/tab/html/tab-kemampuan.component.html',
  styleUrls: ['../../app/tab/css/tab-kemampuan.component.css']
})
export class TabKemampuanComponent implements OnInit {
  FormKemampuan: FormGroup;
  dataCostumer:any;
  detailCustomer:any;
  dataUpdate:any;
  jobCategory:any;
  jobPosition:any;
  closeResult: string;
  settings = {};
  settingsJobs = {};

    constructor(private _service: SkillService, private people:CustumerService, private fb:FormBuilder, private modalService: NgbModal) { 
    this.FormKemampuan=fb.group({
      'skill': [null, Validators.required],
      'job_pos_cat': [null, Validators.required],
      'job_position_id': [null, Validators.required]
      
    })

    this.settings = {
      singleSelection: true, 
      text:"Pilih Kategori Kerjaan",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class-example",
      labelKey: "name",
      searchBy: ['name','capital']
    };

    this.settingsJobs = {
      singleSelection: true, 
      text:"Pilih Posisi Kerjaan",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class-example",
      labelKey: "name",
      searchBy: ['name','capital']
    };
  }

  ngOnInit() {
    this.getJobCatPosition();
  }

  getDataSkill(){
    this._service.getDataSkill()
    .subscribe(res => {
      this.dataCostumer=res;
      this.detailCustomer=this.dataCostumer.data;      
    })
  }

  update(data, content){
    let dataSkill = {
      job_pos_cat: data.job_pos_cat[0].id,
      job_position_id: data.job_position_id[0].id,      
      skill: data.skill,
    }   
    this._service.updateDataSkill(dataSkill)
    .subscribe(
      res => {  
        this.dataUpdate=res;
        if(this.dataUpdate.code===200){
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
          console.log(this.dataUpdate);
          this.FormKemampuan.patchValue({
            skill:"",
            job_pos_cat:"",
            job_position_id:""
            
          })
        }else{
          alert('error')
        }
      })
  }

  getJobPosition(data){
    this.people.getJobPosition(data.id)
    .subscribe(res => {
      this.jobPosition=res.data;
    })
  }

  getJobCatPosition(){
    this.people.getJobCatPosition()
    .subscribe(res => {
      
      this.jobCategory=res.data;
      console.log(this.jobCategory)
    })
  }


  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

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
