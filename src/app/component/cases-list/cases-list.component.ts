import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CasesFilterModel } from '../../models/casesFilter.model';
import { BackendService } from 'src/app/services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})
export class CasesListComponent implements OnInit {
  page = 1;
  itemsPerPage = 20;
  totalItems : any;

  cases : CasesFilterModel[];

  filterParma :Map<String, String> = new Map<String, String>();
  filter :Map<String, String> = new Map<String, String>();
  transale :Map<String, String> = new Map<String, String>();
  constructor(private backendService: BackendService,private router: Router) { }

  ngOnInit(): void {
    this.transale.set("name","الاسم");
    this.transale.set("address","العنوان");
    this.transale.set("code","الرقم القومي");
    this.transale.set("phoneNumber","رقم الهاتف");
    this.transale.set("gender","النوع");

    this.gty(this.page);
  }

  getAge(dateOfBirth:number){
    let timeDiff = Math.abs(Date.now() - dateOfBirth);
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  }

  openCaseProfile(id:Number){
    this.router.navigate(['/case/profile',id]);

  }

  gty(page: any){
    this.page=page;
    this.page--;
    let url = `person/search?page=${this.page}&size=${this.itemsPerPage}`;
    this.backendService.ViewEntities(url,this.filterParma).subscribe((data: any) => {
      this.cases =  data.content;
      this.totalItems = data.totalElements;
    })
  }

  addFilter(data) {
    if(data.key && data.value){
      this.filterParma[data.key] = data.value;
      this.filter.set(data.key, data.value);
      this.filterTable();
    }
   }

  removeFilter(item){

    delete this.filterParma[item.key];
    this.filter.delete(item.key);
    this.filterTable();
   }

  filterTable(){
    this.gty(1);
   }


  transalateText(key){
    return this.transale.get(key);
  }

}
