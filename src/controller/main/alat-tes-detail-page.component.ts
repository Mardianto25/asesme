import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlatTesService } from '../../service/alat-tes.service';
import { MasterClassModule } from '../../app/class';

@Component({
  selector: 'app-alat-tes-detail-page',
  templateUrl: '../../app/main/html/alat-tes-detail-page.component.html',
  styleUrls: ['../../app/main/css/alat-tes-detail-page.component.css']
})
export class AlatTesDetailPageComponent implements OnInit {
  
  constructor(private _route: ActivatedRoute, private _alatTes:AlatTesService, private master:MasterClassModule) { 
    this._route.params.subscribe( params => this.master.idParams = params.id);
  }

  ngOnInit() {
    this.getDetail();
  }

  getDetail(){
    this._alatTes.getDataAlatTesDetail(this.master.idParams)
    .subscribe(res => {
      this.master.ambilData=res;
      this.master.hasilData=this.master.ambilData.data[0];
    })
  }

}
