import { CampaignFilterModel } from './../../models/campaignFilter.model';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  page = 1;
  itemsPerPage = 20;
  totalItems : any;

  filterParma :Map<String, String> = new Map<String, String>();
  filter :Map<String, String> = new Map<String, String>();
  transale :Map<String, String> = new Map<String, String>();

  campaigns : CampaignFilterModel[];

  constructor(private backendService: BackendService,private router: Router) { }

  ngOnInit(): void {
    this.transale.set("name","الاسم");
    this.transale.set("description","العنوان");

    this.gty(this.page)
  }

  gty(page: any){
    this.page=page;
    this.page--;
    let url = `campaign/search?page=${this.page}&size=${this.itemsPerPage}`;
    this.backendService.ViewEntities(url,this.filterParma).subscribe((data: any) => {
      this.campaigns =  data.content;
      this.totalItems = data.totalElements;
      console.log(this.campaigns);

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

   openCampaignProfile(id:Number){
    this.router.navigate(['/campaign/profile',id]);
  }

  transalateText(key){
    return this.transale.get(key);
  }
}
