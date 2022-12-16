import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../../service/experience.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import iziModal from 'izimodal/js/iziModal';

@Component({
  selector: 'app-tab-pengalaman',
  templateUrl: '../../app/tab/html/tab-pengalaman.component.html',
  styleUrls: ['../../app/tab/css/tab-pengalaman.component.css']
})
export class TabPengalamanComponent implements OnInit {

  FormPengalaman: FormGroup;
  FormModal: FormGroup;
  dataExperience:any;
  detailExperience:any;;
  tes:'mardi';
  updateOradd=true;

  constructor(private _service: ExperienceService, private fb:FormBuilder) { 
    this.FormPengalaman=fb.group({
      'name': [null, Validators.required],
      'role': [null, Validators.required],
      'to': [null, Validators.required],
      'since': [null, Validators.required],

    })

    this.FormModal=fb.group({
      'id': [null],
      'name': [null, Validators.required],
      'role': [null, Validators.required],
      'to': [null, Validators.required],
      'since': [null, Validators.required]      
    })
  }

  ngOnInit() {
    this.getDataExperience();

    // $(document).on('click', '.update', function(){
    //   $( ".myModal" ).attr( "data-dismiss", "modal" );
    // })
    // $("a[href^='#']").click(function(e) {
    //   e.preventDefault();
      
    //   var position = $($(this).attr("href")).offset().top;
    
    //   $("body, html").animate({
    //     scrollTop: position
    //   } /* speed */ );
    // });
    // $.fn.iziModal = iziModal;
    // $(document).on('click', '.open-options', function(event) {
    //   event.preventDefault();
    //   $('.modal-options').iziModal('open');
    //   $('.modal-options').iziModal('');
    // });
    // $(document).on('click', '.submit', function(event) {
    //   event.preventDefault();
      
    // });
    // $('.modal-options').iziModal({
    //   headerColor: '#26A69A', //ヘッダー部分の色
    //   width: '50%', //横幅
    //   overlayColor: 'rgba(0, 0, 0, 0.5)', //モーダルの背景色
    //   fullscreen: true, //全画面表示
    //   transitionIn: 'fadeInUp', //表示される時のアニメーション
    //   transitionOut: 'fadeOutDown' //非表示になる時のアニメーション
    // });
   
  }

  reset(){
    this.FormPengalaman.patchValue({
      name:'',
      role:'',
      since:'',
      to:'',
      id:''
    })
  }
  getDataExperience(){
    this._service.getDataExperience()
    .subscribe(res => {
      this.dataExperience=res;
      this.detailExperience=this.dataExperience.data;
      this.updateOradd=false;
    })
  }

  simpan(data){
    this._service.simpanDataExperience(data)
    .subscribe(res => {
      this.getDataExperience();
      this.reset();
    })
  }

  update(data){
    this._service.updateDataExperience(data.id, data)
    .subscribe(res => {
      this.getDataExperience();
      this.reset();
    })
  }

  delete(data){
    this._service.deleteDataExperience(data.id)
    .subscribe(res => {
      this.getDataExperience();
      this.reset();
    })
  }
  jquery(data){
    $(document).on('click', '.btn-success', function(){
      $('#idModal').val(data.id);
      $('#nameModal').val(data.name);
      $('#roleModal').val(data.role);
      $('#toModal').val(data.to);
      $('#sinceModal').val(data.since);
    })
  }
  openClick(data){
    this.updateOradd=true;
    this.jquery(data);
    this.FormModal.patchValue({
      id:data.id,
      name:data.name,
      role:data.role,
      since: data.since,
      to:data.to
    })
  }

}
