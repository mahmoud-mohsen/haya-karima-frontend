import { NewPersonComponent } from './component/new-person/new-person.component';
import { AuthGuard } from './AuthGuard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './component/layout/layout.component';
import { HttpConfigInterceptor } from './services/interceptor/httpconfig.interceptor';
import { LoginComponent } from './component/login/login.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './component/registration/registration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CasesListComponent } from './component/cases-list/cases-list.component';
import { PersonProfileComponent } from './component/person-profile/person-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewCampaignComponent } from './component/new-campaign/new-campaign.component';
import { CampaignListComponent } from './component/campaign-list/campaign-list.component';
import { CampaignProfileComponent } from './component/campaign-profile/campaign-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    RegistrationComponent,
    NewPersonComponent,
    CasesListComponent,
    PersonProfileComponent,
    NewCampaignComponent,
    CampaignListComponent,
    CampaignProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    MatDatepickerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
