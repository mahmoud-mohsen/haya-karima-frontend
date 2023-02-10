import { AuthService } from './../../services/auth-service.service';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private router: Router, private backendService: BackendService, private authService: AuthService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  isAuthenticated() {
    return this.authService.isTokenExistAndNotExipired();
  }

  openAboutPage(menueNumber) {
    this.router.navigateByUrl('/about', { state: { menueNumber: menueNumber } });
  }


  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
