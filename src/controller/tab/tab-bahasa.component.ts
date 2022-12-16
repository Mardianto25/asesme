import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../service/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import iziModal from 'izimodal/js/iziModal';

@Component({
  selector: 'app-tab-bahasa',
  templateUrl: '../../app/tab/html/tab-bahasa.component.html',
  styleUrls: ['../../app/tab/css/tab-bahasa.component.css']
})
export class TabBahasaComponent implements OnInit {

  FormBahasa: FormGroup;
  FormModal: FormGroup;
  dataLanguage:any;
  detailLanguage:any;;
  updateOradd=true;
  bahasa=['Indonesia','Inggris'];
  menulis=['Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang'];
  membaca=['Sangat Baik','Baik','Cukup','Kurang','Sangat Kurang'];

  constructor(private _service: LanguageService, private fb:FormBuilder) { 
    this.FormBahasa=fb.group({
      'language': [null, Validators.required],
      'writing': [null, Validators.required],
      'speaking': [null, Validators.required]  
    })

    this.FormModal=fb.group({
      'id': [null, Validators.required],      
      'language': [null, Validators.required],
      'writing': [null, Validators.required],
      'speaking': [null, Validators.required]       
    })
  }

  ngOnInit() {
    this.getDataLanguage();   
  }

  reset(){
    this.FormBahasa.patchValue({
      language:'',
      writing:'',
      speaking:'',
    })
  }
  getDataLanguage(){
    this._service.getDataLanguages()
    .subscribe(res => {
      this.dataLanguage=res;
      this.detailLanguage=this.dataLanguage.data;
      // this.updateOradd=false;
    })
  }

  simpan(data){
    this._service.simpanDataLanguages(data)
    .subscribe(res => {
      this.getDataLanguage();
      this.reset();
    })
  }

  update(data){
    console.log(data)
    this._service.updateDataLanguages(data.id, data)
    .subscribe(res => {
      this.getDataLanguage();
      this.reset();
      console.log(res)
    })
  }

  delete(data){
    this._service.deleteDataLanguages(data.id)
    .subscribe(res => {
      this.getDataLanguage();
      this.reset();
    })
  }

  jquery(data){
    $(document).on('click', '.btn-success', function(){
      $('#idModal').val(data.id);      
      $('#languageModal').val(data.language);
      $('#writingModal').val(data.writing);
      $('#speakingModal').val(data.speaking);     
    })
  }
  
  openClick(data){
    this.updateOradd=true;
    this.jquery(data);

    this.FormModal.patchValue({
      id:data.id,
      language:data.language,
      writing:data.writing,
      speaking:data.speaking
    })
  }

}
