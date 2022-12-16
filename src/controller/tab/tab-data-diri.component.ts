import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EncrDecrServiceService } from '../../service/encr-decr-service.service';
import { CustumerService } from '../../service/custumer.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-tab-data-diri',
  templateUrl: '../../app/tab/html/tab-data-diri.component.html',
  styleUrls: ['../../app/tab/css/tab-data-diri.component.css']
})
export class TabDataDiriComponent implements OnInit {
  @Input() public PostData;
  FormAkun:FormGroup;
  FormDataDiri:FormGroup;
  dataCostumer:any;
  detailCostumer:any;
  dataProvinsi:any=[];
  dataKota:any=[];
  genders=['Laki-Laki', 'Perempuan'];
  people_id:any;
  errorValidasi=true;
  agama=['Islam','Khatolik','Kristen','Hindu','Buddha','Kong Hu Cu'];
  validasiRes:any;
  settings={};
  settingsKota={};
  getDataProvinsi=[];

  constructor(private _service: CustumerService , private fb: FormBuilder, private decrypt: EncrDecrServiceService) { 

    this.getFormAkun(fb);
    this.getFormDataDiri(fb);

    this.settings = {
      singleSelection: true, 
      text:"Pilih Provinsi",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class-example",
      labelKey: "name",
      searchBy: ['name','capital']
    };

    this.settingsKota = {
      singleSelection: true, 
      text:"Pilih Kota/Kabupaten",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class-example",
      labelKey: "name",
      searchBy: ['name','capital']
    };
  }
  
  getFormAkun(fb){
    this.FormAkun=fb.group({
      'email': [null, [Validators.required, Validators.email]],   
      'password': [null, Validators.required],
      'old_password': [null, Validators.required],      
      'konfirmasi_password': [null, Validators.required], 
      'username': [null, Validators.required]
    })

  }
  getFormDataDiri(fb){
    this.FormDataDiri=fb.group({
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],       
      'phone_number': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(13)])],
      'gender': [null, Validators.required],  
      'born_at': [null, Validators.required],                           
      'address': [null, Validators.required],
      'religion': [null, Validators.required],      
      'birth_date':[null, Validators.required],
      'provinsi': [null, Validators.required],      
      'regency_id':[null, Validators.required],
      'people_id':[null],
    })
  }

  setFormAkun(detailCostumer){
    this.FormAkun.patchValue({
      email:detailCostumer.email,
      username:detailCostumer.username,
      // password: detailCostumer.password,
      old_password: detailCostumer.old_password
    })
  }

  setFormDataDiri(detailCostumer){
    this.getDataProvinsi = [{ id:detailCostumer.province_id, name:detailCostumer.province_name}]
    let dataRegency = [{ id:detailCostumer.regency_id, name:detailCostumer.regency_name}]
    this.validasiRegency(this.getDataProvinsi);
    this.FormDataDiri.patchValue({
      first_name:detailCostumer.first_name,
      last_name:detailCostumer.last_name,
      phone_number:detailCostumer.phone_number,
      born_at:detailCostumer.born_at,
      profession:detailCostumer.profession,
      address:detailCostumer.address,
      religion:detailCostumer.religion,
      provinsi:this.getDataProvinsi,
      regency_id:dataRegency,
      // birth_date:detailCostumer.birth_date,
      birth_date:detailCostumer.birth_date.slice(6,10)+'-'+detailCostumer.birth_date.slice(3,5)+'-'+detailCostumer.birth_date.slice(0,2),
      gender:detailCostumer.gender,

    })
  }

  ngOnInit() {
    this.getDataCustomer();
    this.getProvinsi();
    
  }

  getProvinsi(){
    console.log("id",this.getDataProvinsi)
    this._service.getProvinsi()
    .subscribe(res => {
      this.dataProvinsi=res.data;
    })
  }

  validasiRegency(data){
    if(data.length > 0){
      this._service.getKota(data[0].id)
      .subscribe(res => {
        this.dataKota=res.data;
      })
    }else{

    }
  }

  onChange(data){
    this._service.getKota(data.id)
    .subscribe(res => {
      this.dataKota=res.data;
    })

  }

  handleError(){
    this.errorValidasi=true;
    this.FormAkun.patchValue({
      konfirmasi_password:'',
      old_password:'',
      password:''
    })
  }

  Ecript(){
    var encrypted = this.decrypt.set('123456$#@$^@1ERF', 'password@123456');
    var decrypted = this.decrypt.get('123456$#@$^@1ERF', encrypted);
  }

  setValidasiJK(detailCustomer){
    if(detailCustomer.gender=='M'){
      detailCustomer.gender=this.genders[0]
    }else if(detailCustomer.gender=='F'){
      detailCustomer.gender=this.genders[1]              
    }else{
      detailCustomer.gender='Jenis Kelamin'
    }
  }

  getValidasiJK(data){
    if(data.gender=="Laki-Laki"){
      data.gender ="M"
    }else if(data.gender=="Perempuan"){
      data.gender="F"
    }else{
      data.gender=""
    }
  }
  validasiPassword(data){
    if(data.password!=data.konfirmasi_password){
      this.errorValidasi=false;
    }else if(data.password==null && data.konfirmasi_password==null){
      this.errorValidasi=false;      
    }else if(data.password=="" && data.konfirmasi_password==""){
      this.errorValidasi=false;      
    }else{
      this.updateData(data.people_id, data);
      this.getDataCustomer();
    }
  }
  setTaggal(data){
    if(data.birth_date==""){
      data.birth_date="";
    }else{
      data.birth_date==data.birth_date
    }
  }
  getDataCustomer(){
    this._service.getDataCustomers()
    .subscribe(res => {
      this.dataCostumer=res;
      this.detailCostumer=this.dataCostumer.data;
      console.log(this.detailCostumer)
      this.people_id=this.detailCostumer.people_id;
      this.setValidasiJK(this.detailCostumer);
      this.setTaggal(this.detailCostumer);
      this.setFormAkun(this.detailCostumer);
      this.setFormDataDiri(this.detailCostumer);
    })
  }

  update(data){
    data.people_id=this.people_id;
    // this.validasiPassword(data);
    this.updateData(data.people_id, data);
    
  }

  updateDataDiri(data){
    data.people_id=this.people_id;
    // data.born_date=data.born_date.slice(6,10)+'-'+data.born_date.slice(3,5)+'-'+data.born_date.slice(0,2);
    this.getValidasiJK(data)    
    this.updateData(data.people_id, data);
  }

  updateData(id, data){
    data.provinsi=data.provinsi[0].id;
    data.regency_id=data.regency_id[0].id;
    this._service.updateDataCustomers(id,data)
    .subscribe(res =>{
      this.validasiRes=res;
      if(this.validasiRes.code===200){
        console.log(res);
        this.handleError();
        this.getDataCustomer();
      }else{
        alert("Error Message")
      }
      
    })
  }

}
