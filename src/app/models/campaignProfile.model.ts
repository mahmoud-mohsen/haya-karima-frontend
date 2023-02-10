import { CasesFilterModel } from './casesFilter.model';
export class CampaignProfile {

    id:String
    name: String;
    description: String
    addedUser: String
    creationDate: Number;
    persons: CasesFilterModel[];
}
