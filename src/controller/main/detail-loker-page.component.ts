import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../service/job.service';
import { MasterClassModule } from '../../app/class';

@Component({
  selector: 'app-detail-loker-page',
  templateUrl: '../../app/main/html/detail-loker-page.component.html',
  styleUrls: ['../../app/main/css/detail-loker-page.component.css']
})
export class DetailLokerPageComponent implements OnInit {
  btnLamar:boolean; 
  dataLoker:any="";
  detailLoker:any="";
  profile=JSON.parse(localStorage.getItem('profile'));
  constructor(private route:ActivatedRoute, private _service:JobService,private master:MasterClassModule) { 
    this.route.params.subscribe( params => this.master.idParams = params.id);
    
  }

  ngOnInit() {
    // this.route.queryParamMap.subscribe(params => {
    //   this.loker = {...params};
    //   this.detailLoker=this.loker.params;
    //   console.log(this.detailLoker)
    // });
    this.getDetail();

  }

  getDetail(){
    this._service.getDataJobDetail(this.master.idParams)
    .subscribe(res=> {
      console.log(res)
      this.dataLoker=res;
      this.detailLoker=this.dataLoker.data;
    })
  }

  applyJob(data){
    console.log(data);
    let dataAply = {
      member_id: this.profile.people_id,
      job_id: data.id,
      hrd_id: data.institution_id
    }

    this._service.applyJob(dataAply)
    .subscribe(res=> {
      if(res.code===200){
        this.btnLamar=true;
        this.getDetail();
      }else{
        this.btnLamar=false;
      }
    })
  }

}
