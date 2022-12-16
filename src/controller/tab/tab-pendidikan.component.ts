import { Component, OnInit } from '@angular/core';
import { EducationService } from '../../service/education.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import iziModal from 'izimodal/js/iziModal';

@Component({
  selector: 'app-tab-pendidikan',
  templateUrl: '../../app/tab/html/tab-pendidikan.component.html',
  styleUrls: ['../../app/tab/css/tab-pendidikan.component.css']
})
export class TabPendidikanComponent implements OnInit {

  FormPendidikan: FormGroup;
  FormModal: FormGroup;
  dataEducation:any;
  detailEducation:any;;
  updateOradd=true;
  grade=['SMA/SMK','D1','D2','D3','S1','S2','S3'];
  tahun=[];

  constructor(private _service: EducationService, private fb:FormBuilder) { 
    this.FormPendidikan=fb.group({
      'grade': [null, Validators.required],
      'ipk': [null, Validators.required],
      'major': [null, Validators.required],
      'name': [null, Validators.required],
      'since': [null, Validators.required],
      'to': [null, Validators.required]     
    })

    this.FormModal=fb.group({
      'id': [null, Validators.required],      
      'grade': [null, Validators.required],
      'ipk': [null, Validators.required],
      'major': [null, Validators.required],
      'name': [null, Validators.required],
      'since': [null, Validators.required],
      'to': [null, Validators.required]       
    })
  }

  ngOnInit() {
    this.getDataEducations(); 
    this.getTahun();  
  }

  getTahun(){
    for( var a= 1970; a <= 2019; a++){
      this.tahun.push(a);
    }

  }

  reset(){
    this.FormPendidikan.patchValue({
      name:'',
      grade:'',
      ipk:'',
      major:'',
      since:'',
      to:''
    })
  }
  getDataEducations(){
    this._service.getDataEducation()
    .subscribe(res => {
      this.dataEducation=res;
      this.detailEducation=this.dataEducation.data;
      this.updateOradd=false;
    })
  }

  simpan(data){
    this._service.simpanDataEducations(data)
    .subscribe(res => {
      this.getDataEducations();
      this.reset();
    })
  }

  update(data){
    console.log(data)
    this._service.updateDataEducations(data.id, data)
    .subscribe(res => {
      this.getDataEducations();
      this.reset();
    })
  }

  delete(data){
    this._service.deleteDataEducations(data.id)
    .subscribe(res => {
      this.getDataEducations();
      this.reset();
    })
  }
  jquery(data){
    $(document).on('click', '.btn-success', function(){
      $('#idModal').val(data.id);      
      $('#nameModal').val(data.name);
      $('#majorModal').val(data.major);
      $('#gradeModal').val(data.grade);
      $('#ipkModal').val(data.ipk);
      $('#sinceModal').val(data.since);
      $('#toModal').val(data.to);      
    })
  }
  
  openClick(data){
    this.updateOradd=true;
    this.jquery(data);

    this.FormModal.patchValue({
      id:data.id,
      name:data.name,
      grade:data.grade,
      ipk:data.ipk,
      major:data.major,
      since: data.since,
      to:data.to
    })
  }


}
