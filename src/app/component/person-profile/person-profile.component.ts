import { AddSupport } from './../../models/addSupport.model';
import { CampaignFilterModel } from './../../models/campaignFilter.model';
import { CasesFilterModel } from './../../models/casesFilter.model';
import { EditCaseProfile } from './../../models/editCaseProfile.model';
import { NewCase } from './../../models/newCase.model';
import { CaseProfile } from './../../models/caseProfile.model';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.css']
})
export class PersonProfileComponent implements OnInit {

  familyCount: number;
  campaignCount: number;

  caseProfile: CaseProfile;
  relation: String;
  newCase: NewCase;

  sameFather: boolean;
  sameMother: boolean;
  sameWife: boolean;
  sameHusband: boolean;
  sameSibling: boolean;

  sameFatherForExistPerson: boolean;
  sameMotherForExistPerson: boolean;
  sameWifeForExistPerson: boolean;
  sameHusbandForExistPerson: boolean;
  sameSiblingForExistPerson: boolean;

  editView;

  addNewPerson = false;
  addExistPerson = false;

  personByCode: CasesFilterModel;
  codeNeeded;
  campaignNeeded;

  relationExistPerson;

  campaignByName: CampaignFilterModel[];

  addSupport: AddSupport;

  supportNote: String;
  constructor(private activeRouter: ActivatedRoute, private backendService: BackendService, private router: Router) {
    this.familyCount = 0;
    this.campaignCount = 0;

    this.sameFather = false;
    this.sameMother = false;
    this.sameWife = false;
    this.sameHusband = false;
    this.sameSibling = false;

    this.sameFatherForExistPerson = false;
    this.sameMotherForExistPerson = false;
    this.sameWifeForExistPerson = false;
    this.sameHusbandForExistPerson = false;
    this.sameSiblingForExistPerson = false;


    this.caseProfile = new CaseProfile();
    this.newCase = new NewCase();
    this.editView = false

    this.addSupport = new AddSupport();
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(params => {
      let personId = +params.get('id');
      this.getPerson(personId);
    });
  }

  getPerson(id: Number) {
    let url = `person/${id}`;
    this.backendService.ViewEntities(url).subscribe((response: any) => {
      this.caseProfile = response;
      if (this.caseProfile != null) {
        this.getFamilyCount();
        this.getCampaignCount();
        this.getAge(this.caseProfile.dateOfBirth);
      }
    });
  }

  getAge(dateOfBirth: number) {
    let timeDiff = Math.abs(Date.now() - dateOfBirth);
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

  openCaseProfile(id: Number) {
    this.router.navigate(['/case/profile', id]).then(() => {
      window.location.reload();
    });
  }

  getCampaignCount() {
    if (this.caseProfile.campaigns != null) {
      this.campaignCount = this.caseProfile.campaigns.length;
    }
  }
  getFamilyCount() {
    this.familyCount = 0;
    this.familyCount++;
    if (this.caseProfile && this.caseProfile.father) {
      this.familyCount++;
    }
    if (this.caseProfile && this.caseProfile.mother) {
      this.familyCount++;
    }
    if (this.caseProfile && this.caseProfile.husband) {
      this.familyCount++;
    }
    if (this.caseProfile && this.caseProfile.wifes && this.caseProfile.wifes.length != 0) {
      this.familyCount += this.caseProfile.wifes.length;
    }
    if (this.caseProfile && this.caseProfile.childs && this.caseProfile.childs.length != 0) {
      this.familyCount += this.caseProfile.childs.length;
    }
    if (this.caseProfile && this.caseProfile.siblings && this.caseProfile.siblings.length != 0) {
      this.familyCount += this.caseProfile.siblings.length;
    }
  }

  saveNewCaseWithRelation() {

    let url = `person/${this.caseProfile.id}/${this.relation}`;
    let params = {};
    if (this.relation == 'child') {
      params = { "sameWife": this.sameWife, "sameHusband": this.sameHusband, "sameSibling": this.sameSibling };

    }
    if (this.relation == 'sibling') {
      params = { "sameFather": this.sameFather, "sameMother": this.sameMother, "sameSibling": this.sameSibling };
    }
    this.backendService.post(this.newCase, url, params).subscribe(() => {
      this.openCaseProfile(this.caseProfile.id);
    });
  }

  saveExistCaseWithRelation() {
    if (this.caseProfile.id != null && this.relationExistPerson != null && this.personByCode != null) {
      let url = `person/${this.caseProfile.id}/${this.relationExistPerson}/${this.personByCode.id}`;
      let params = {};
      if (this.relationExistPerson == 'child') {
        params = { "sameWife": this.sameWifeForExistPerson, "sameHusband": this.sameHusbandForExistPerson, "sameSibling": this.sameSiblingForExistPerson };

      }
      if (this.relationExistPerson == 'sibling' || this.relationExistPerson == 'father' || this.relationExistPerson == 'mother') {
        params = { "sameFather": this.sameFatherForExistPerson, "sameMother": this.sameMotherForExistPerson, "sameSibling": this.sameSiblingForExistPerson };
      }

      this.backendService.post(null, url, params).subscribe(() => {
        this.openCaseProfile(this.caseProfile.id);
      });
    }

  }

  showEdit() {
    this.editView = !this.editView;
  }

  saveEdit() {
    let url = `person/${this.caseProfile.id}`;

    this.backendService.putEntity(this.caseProfile, url).subscribe(() => {
      window.location.reload();
    });;
  }

  deleteCase() {
    if (confirm("هل انت متأكد من حذف العميل ؟")) {
      let url = `person/${this.caseProfile.id}`;
      this.backendService.deleteEntity(url).subscribe(() => {
        this.router.navigate(['/cases']).then(() => {
          window.location.reload();
        });
      });
    }

  }

  changeAddingPersonApproach(addNewPerson, addExistPerson) {
    if (addNewPerson) {
      this.addNewPerson = true;
      this.addExistPerson = false;
    }
    if (addExistPerson) {
      this.addNewPerson = false;
      this.addExistPerson = true;
    }
  }

  getPersonByCode() {
    if (this.codeNeeded) {
      let params = { "code": this.codeNeeded };
      let url = `person/code`;
      this.backendService.ViewEntities(url, params).subscribe((response: any) => {
        this.personByCode = response;
      });
    }

  }

  removeFatherRelation(relation: CasesFilterModel) {

    if (confirm("هل انت متاكد من حذف والد العميل")) {
      let url = `person/${this.caseProfile.id}/relation/father/${relation.id}`;
      this.sendDeleteRequest(url);
    }
  }

  removeMotherRelation(relation: CasesFilterModel) {

    if (confirm("هل انت متاكد من حذف والدة العميل")) {
      let url = `person/${this.caseProfile.id}/relation/mother/${relation.id}`;
      this.sendDeleteRequest(url);
    }
  }

  removeWifeRelation(relation: CasesFilterModel) {

    if (confirm("هل انت متاكد من حذف زوجةالعميل")) {
      let url = `person/${this.caseProfile.id}/relation/wife/${relation.id}`;
      this.sendDeleteRequest(url);
    }
  }

  removeHusbandRelation(relation: CasesFilterModel) {

    if (confirm("هل انت متاكد من حذف زوج العميل")) {
      let url = `person/${this.caseProfile.id}/relation/husband/${relation.id}`;
      this.sendDeleteRequest(url);
    }
  }

  removeSiblingRelation(relation: CasesFilterModel) {

    if (confirm("هل انت متاكد من حذف اخ/اخت العميل")) {
      let url = `person/${this.caseProfile.id}/relation/sibling/${relation.id}`;
      this.sendDeleteRequest(url);
    }
  }

  removeChildRelation(relation: CasesFilterModel) {

    if (confirm("هل انت متاكد من حذف ابن/ابنة العميل")) {
      let url = `person/${this.caseProfile.id}/relation/child/${relation.id}`;
      this.sendDeleteRequest(url);
    }
  }


  private sendDeleteRequest(url) {
    this.backendService.deleteEntity(url).subscribe(() => {
      this.openCaseProfile(this.caseProfile.id)
    });
  }

  getCampaignByName() {
    let params = {}
    if (this.campaignNeeded) {
      params = { "name": this.campaignNeeded };
    }
    let url = `campaign/search`;
    this.backendService.ViewEntities(url, params).subscribe((response: any) => {
      if (response != null) {
        this.campaignByName = response.content;
      }
    });

  }

  addToCampaign(campaignId) {
    this.addSupport.campaignId = campaignId;
    this.addSupport.personId = this.caseProfile.id;
    this.addSupport.note = this.supportNote;
    let url = "support"
    this.backendService.post(this.addSupport, url).subscribe(() => {
      this.openCaseProfile(this.caseProfile.id);
    });
  }

  openCampaignProfile(id) {
    this.router.navigate(['/campaign/profile', id]);
  }

  removeCampaignFromCase(campaignId){
    if (confirm("هل انت متاكد من حذف المبادرة من العميل")) {
      let url = `support/campaign/${campaignId}/person/${this.caseProfile.id}`;
      this.sendDeleteRequest(url);
    }
  }
}
