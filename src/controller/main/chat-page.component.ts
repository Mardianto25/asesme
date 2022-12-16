import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: '../../app/main/html/chat-page.component.html',
  styleUrls: ['../../app/main/css/chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  dataChat:any;
  constructor(private _service:ChatService, private router:Router) { }

  ngOnInit() {
    this.getDataChat();
  }

  getDataChat(){
    this._service.getDataPesan()
    .subscribe(res => {
      this.dataChat=res.data;
      console.log(this.dataChat)
    })
  }

  readChat(id, data){
    console.log(id)
    this._service.updateStatusPesan(id, data)
    .subscribe(res=>{
      // console.log("Pesan Baca", res);
      this.router.navigate([`main/me/detail-chat/${id}`])
    })
  }
  

}
