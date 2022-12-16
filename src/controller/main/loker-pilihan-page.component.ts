import { Component, OnInit } from '@angular/core';
import { JobService } from '../../service/job.service';

@Component({
  selector: 'app-loker-pilihan-page',
  templateUrl: '../../app/main/html/loker-pilihan-page.component.html',
  styleUrls: ['../../app/main/css/loker-pilihan-page.component.css']
})
export class LokerPilihanPageComponent implements OnInit {
  // lokerPilihan:any;
  detailLokerPilihan:any;
  detailBookmart:any;
  idMember= JSON.parse(localStorage.getItem('profile'));

  constructor(private _job:JobService) { }

  ngOnInit() {
    this.getDataBookmart(this.idMember.people_id);
    this.getDataJobApply(this.idMember.people_id);
  }

  getDataBookmart(id){
    console.log(id)
    this._job.getDataJobBookmart(id)
    .subscribe(res => {
      this.detailBookmart=res.data;
      console.log("bookmart",res);
    })
  }

  deleteBookmart(id){
    this._job.deleteBookmart(id)
    .subscribe(res => {
      console.log(res);
      this.getDataBookmart(this.idMember.people_id);
    })
  }

  getDataJobApply(id){
    this._job.getDataJobApply(id)
    .subscribe(res => {
      this.detailLokerPilihan=res.data;
      console.log("Apply",this.detailLokerPilihan);
    })
  }
}
