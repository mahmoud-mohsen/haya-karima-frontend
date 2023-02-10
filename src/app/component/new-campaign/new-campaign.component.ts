import { NewCampaign } from './../../models/newCampaign.model';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.css']
})
export class NewCampaignComponent implements OnInit {

  newCampaign: NewCampaign
  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.newCampaign=new NewCampaign();
  }

  saveCampaign() {
    let url = `campaign`;
    this.backendService.post(this.newCampaign,url).subscribe((response: any) => {
      if(response.id!=null){
        this.openCampaignProfile(response.id);
      }
    });
  }


  openCampaignProfile(id:Number){
    this.router.navigate(['/campaign/profile',id]);

  }
}
