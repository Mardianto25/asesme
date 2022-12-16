import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../../service/certificate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import iziModal from 'izimodal/js/iziModal';

@Component({
  selector: 'app-tab-sertifikat',
  templateUrl: '../../app/tab/html/tab-sertifikat.component.html',
  styleUrls: ['../../app/tab/css/tab-sertifikat.component.css']
})
export class TabSertifikatComponent implements OnInit {

  FormCertificate: FormGroup;
  FormModal: FormGroup;
  dataCertificate:any;
  data:any;
  updateOradd=true;
  tahun=[];

  constructor(private _service: CertificateService, private fb:FormBuilder) { 
    this.FormCertificate=fb.group({
      'name': [null, Validators.required],
      'received_year': [null, Validators.required],
      'organization': [null, Validators.required]  
    })

    this.FormModal=fb.group({
      'id': [null, Validators.required],      
      'name': [null, Validators.required],
      'received_year': [null, Validators.required],
      'organization': [null, Validators.required]       
    })
  }

  ngOnInit() {
    this.getDataCertificates();
    this.getTahun();   
  }

  getTahun(){
    for( var a= 1970; a <= 2019; a++){
      this.tahun.push(a);
    }
  }

  reset(){
    this.FormCertificate.patchValue({
      name:'',
      received_year:'',
      organization:'',
    })
  }
  getDataCertificates(){
    this._service.getDataCertificates()
    .subscribe(res => {
      this.dataCertificate=res;
      this.data=this.dataCertificate.data;
      this.updateOradd=false;
    })
  }

  simpan(data){
    this._service.simpanDataCertificates(data)
    .subscribe(res => {
      this.getDataCertificates();
      this.reset();
    })
  }

  update(data){
    this._service.updateDataCertificates(data.id, data)
    .subscribe(res => {
      this.getDataCertificates();
      this.reset();
      console.log(res)
    })
  }

  delete(data){
    this._service.deleteDataCertificates(data.id)
    .subscribe(res => {
      this.getDataCertificates();
      this.reset();
    })
  }

  jquery(data){
    $(document).on('click', '.btn-success', function(){
      $('#idModal').val(data.id);      
      $('#nameModal').val(data.name);
      $('#received_yearModal').val(data.received_year);
      $('#organizationModal').val(data.organization);     
    })
  }
  
  openClick(data){
    this.updateOradd=true;
    this.jquery(data);

    this.FormModal.patchValue({
      id:data.id,
      name:data.name,
      received_year:data.received_year,
      organization:data.organization
    })
  }

}
