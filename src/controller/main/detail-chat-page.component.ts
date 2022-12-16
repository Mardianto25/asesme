import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterClassModule } from '../../app/class';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-detail-chat-page',
  templateUrl: '../../app/main/html/detail-chat-page.component.html',
  styleUrls: ['../../app/main/css/detail-chat-page.component.css']
})
export class DetailChatPageComponent implements OnInit {
  rForm:FormGroup;
  paramChat:any;
  detailChat:any;
  idProfile=JSON.parse(localStorage.getItem('profile'));
  
  constructor(private fb: FormBuilder,private service:ChatService, private route:ActivatedRoute) { 
    this.route.params.subscribe( params => this.paramChat = params.id);
    
    this.rForm =fb.group({
      'content': [null, Validators.required],
      'message_id': [null],  
      'from': [null],  
      'to': [null]                                                                    
    })
  }

  ngOnInit() {
    this.getDetailChat();
  }
  setForm(data){
    this.rForm.patchValue({
      message_id: data.message_id,
      from: this.idProfile.first_name,
      to:data.from
    })
  }
  getDetailChat(){
    this.service.getDetailPesan(this.paramChat)
    .subscribe(res => {
      this.detailChat=res.data.message_detail;
      console.log(this.detailChat)
      this.setForm(this.detailChat[0])
    })
  }

  reset(){
    this.rForm.patchValue({
      content:""
    })
  }
  onClick(data){
    this.service.kirimPesan(data)
    .subscribe(res =>{
      console.log("sukses", res);
      if(res.code===200){
        this.reset();
        this.getDetailChat();
      }else{
        alert("Pesan Gagal Terkirim");
        this.getDetailChat();        
      }
    })
  }

}
