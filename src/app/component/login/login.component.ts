import { AuthService } from './../../services/auth-service.service';
import { Router } from '@angular/router';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;
  constructor(private backendService: BackendService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const token: string = localStorage.getItem('token');

    if (this.authService.isTokenExistAndNotExipired()) {
      this.router.navigate(['/home']);
    }
  }



  login() {
    let param = { "username": this.username, "password": this.password };

    let url = `login`;
    this.backendService.post(param, url).subscribe((response: any) => {
      localStorage.setItem('token', response.access_token);
      window.location.href=`/home`;
    });
  }
}
