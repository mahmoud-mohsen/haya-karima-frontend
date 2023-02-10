import { CampaignProfile } from './../../models/campaignProfile.model';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-profile',
  templateUrl: './campaign-profile.component.html',
  styleUrls: ['./campaign-profile.component.css']
})
export class CampaignProfileComponent implements OnInit {
  campaignProfile: CampaignProfile;
  editView;
  casesCount: Number = 0;
  constructor(private activeRouter: ActivatedRoute, private backendService: BackendService, private router: Router) {
    this.campaignProfile = new CampaignProfile();
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      let campaignId = +params.get('id');
      this.getCampaign(campaignId);
    });
  }

  getCampaign(id: Number) {
    let url = `campaign/${id}`;
    this.backendService.ViewEntities(url).subscribe((response: any) => {
      this.campaignProfile = response;
      if (this.campaignProfile) {
        this.getCasesCount();
      }
    });
  }

  showEdit() {
    this.editView = !this.editView;
  }

  deleteCampaign() {
    if (confirm("هل انت متأكد من حذف المبادرة ؟")) {
      let url = `campaign/${this.campaignProfile.id}`;
      this.backendService.deleteEntity(url).subscribe(() => {
        this.router.navigate(['/campaigns']).then(() => {
          window.location.reload();
        });
      });
    }
  }

  saveEdit() {
    let url = `campaign/${this.campaignProfile.id}`;

    this.backendService.putEntity(this.campaignProfile, url).subscribe(() => {
      window.location.reload();
    });;
  }

  openCaseProfile(id: String) {
    this.router.navigate(['/case/profile', id]).then(() => {
      window.location.reload();
    });
  }

  getCasesCount() {
    if (this.campaignProfile != null && this.campaignProfile.persons != null) {
      this.casesCount = this.campaignProfile.persons.length;
    }
  }


  getAge(dateOfBirth: number) {
    let timeDiff = Math.abs(Date.now() - dateOfBirth);
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

  removePersonFromCampaign(personId) {
    if (confirm("هل انت متاكد من حذف العميل من المبادرة")) {
      let url = `support/campaign/${this.campaignProfile.id}/person/${personId}`;
      this.sendDeleteRequest(url);
    }
  }

  private sendDeleteRequest(url) {
    this.backendService.deleteEntity(url).subscribe(() => {
      this.router.navigate(['/campaign/profile', this.campaignProfile.id]).then(() => {
        window.location.reload();
      });

    });
  }
}
