import { AuthService } from './../../services/auth-service.service';
import { Router } from '@angular/router';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private permissionsService: NgxPermissionsService, private backendService: BackendService, private authService: AuthService) {
   }

  ngOnInit(): void {
    if(!this.isAuthenticated()){
      this.router.navigateByUrl('/login');
    }

    let permissions =[''];
    let roles=this.authService.getRoles();
    if(roles){
      permissions = roles;
    }

    this.permissionsService.loadPermissions(permissions);

  }


  isAuthenticated() {
    return this.authService.isTokenExistAndNotExipired();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openAboutPage(menueNumber) {
    this.router.navigateByUrl('/about', { state: { menueNumber: menueNumber } });

  }
}
