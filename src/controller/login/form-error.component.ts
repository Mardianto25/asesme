import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  templateUrl: '../../app/login/html/form-error.component.html',
  styleUrls: ['../../app/login/css/form-error.component.css']
})
export class FormErrorComponent implements OnInit {
  @Input() errorMsg: string;
  @Input() displayError: boolean;


  constructor() { }

  ngOnInit() {
  }



}
