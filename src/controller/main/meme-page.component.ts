import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import * as $ from 'jquery';
import { unescapeIdentifier } from '@angular/compiler';
import { MasterClassModule } from '../../app/class';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@Component({
  selector: 'app-meme-page',
  templateUrl: '../../app/main/html/meme-page.component.html',
  styleUrls: ['../../app/main/css/meme-page.component.css']
})
export class MemePageComponent implements OnInit {
  dataMeme:any;
  detailMeme:any;
  constructor(private _service: UsersService, private master:MasterClassModule) { }

  ngOnInit() {
    this.getMeme();
    
  }

  getMeme(){
      this._service.getMeme()
      .subscribe(res =>{
        this.dataMeme=res;
        this.detailMeme=this.dataMeme.data;
        this.master.itemsToShow=this.detailMeme.slice(0, this.master.noOfItemsToShowInitially);
      })
  }

  onScroll() {
    if(this.master.noOfItemsToShowInitially <= this.master.hasilData.length) {
      this.master.noOfItemsToShowInitially += this.master.itemsToLoad;
      this.master.itemsToShow = this.master.hasilData.slice(0, this.master.noOfItemsToShowInitially);
      console.log("scrolled");
    } else {
      this.master.isFullListDisplayed = true;
    }
  }

}
