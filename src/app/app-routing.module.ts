import { CampaignProfileComponent } from './component/campaign-profile/campaign-profile.component';
import { CampaignListComponent } from './component/campaign-list/campaign-list.component';
import { NewCampaignComponent } from './component/new-campaign/new-campaign.component';
import { PersonProfileComponent } from './component/person-profile/person-profile.component';
import { NewPersonComponent } from './component/new-person/new-person.component';
import { CasesListComponent } from './component/cases-list/cases-list.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AuthGuard } from './AuthGuard';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'cases', component: CasesListComponent, canActivate: [AuthGuard] },
  { path: 'campaigns', component: CampaignListComponent, canActivate: [AuthGuard] },


  { path: 'registration', component: RegistrationComponent },
  { path: 'case/new', component: NewPersonComponent, canActivate: [AuthGuard] },
  { path: 'campaign/new', component: NewCampaignComponent, canActivate: [AuthGuard] },
  { path: 'case/profile/:id', component: PersonProfileComponent, pathMatch: 'full' },
  { path: 'campaign/profile/:id', component: CampaignProfileComponent, pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
