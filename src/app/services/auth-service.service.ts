import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getRoles() {
    if (localStorage.getItem('token')) {
      let jwtData = localStorage.getItem('token').split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      return decodedJwtData.authorities;
    }
  }
  isTokenExist() {
    const token: string = localStorage.getItem('token');
    if (token) {
      return true
    }
    return false;
  }

  isTokenExistAndNotExipired() {
    const token: string = localStorage.getItem('token');

    if (token || !this.isTokenExpired()) {
      return true;
    }
    return false;
  }

  isTokenExpired() {
    const token: string = localStorage.getItem('token');
    if (token) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    return true;

  }

  logout() {
    localStorage.removeItem('token');
  }
}
