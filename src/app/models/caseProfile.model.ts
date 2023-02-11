import { CampaignFilterModel } from './campaignFilter.model';
import { CasesFilterModel } from './casesFilter.model';
export class CaseProfile {

    id:Number
    name: String;
    socialStatus: String;
    educationLevel: String;
    code: String;
    phoneNumber: String;
    address: String;
    note: String;
    dead: Boolean;
    gender: String;
    dateOfBirth: number;
    age:number;
    addedUser: String
    creationDate: Number;
    father: CasesFilterModel;
    mother: CasesFilterModel;
    childs: CasesFilterModel[];
    siblings: CasesFilterModel[];
    wifes: CasesFilterModel[];
    husband: CasesFilterModel;
    campaigns: CampaignFilterModel[];
}
