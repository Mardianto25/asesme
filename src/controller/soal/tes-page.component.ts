import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-tes-page',
  templateUrl: '../../app/soal/html/tes-page.component.html',
  styleUrls: ['../../app/soal/css/tes-page.component.css']
})
export class TesPageComponent implements OnInit {
  rForm: FormGroup;
  soals:any;
  constructor(private _post:UsersService, private fb: FormBuilder) { 
    this.rForm=fb.group({
      'title': [null, Validators.required],
      'body': [null, Validators.required]
    })
  }

  ngOnInit() {
    // this.getData();
    this.getSoal();

    $(".toggle-button").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("active");
      $("#slider").toggleClass("carousel-item active");
      
    });
    $(window).scroll(function(){
      if ($(window).scrollTop() >= 300) {
          $('.rotate').addClass('top');
          // $('nav div').addClass('visible-title');
      }
      else {
          $('.rotate').removeClass('top');
          // $('nav div').removeClass('visible-title');
      }
    });   
  }

  getSoal(){
    this._post.getSoal()
    .subscribe( res => {
      console.log(res);
      this.soals=res;
    })
  }
  getData(){
    this._post.getDataPosts()
    .subscribe( res => {
      console.log(res[0])
    })
  }

}
