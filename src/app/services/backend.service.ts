import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  //baseUrl: string = 'http://localhost:8080/';
  baseUrl: string = 'https://haya-karima.herokuapp.com/';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });
  options;


  constructor(private http: HttpClient) {
  }

  post(entity: any, url: String, param?) {
    this.options = { headers: this.httpHeaders, params: param };

    return this.http.post(this.baseUrl + url, JSON.stringify(entity), this.options);
  }

  putEntity(entity: any, url: String) {

    this.options = { headers: this.httpHeaders };

    return this.http.put(this.baseUrl + url, JSON.stringify(entity), this.options);
  }

  ViewEntities(url: String, param?) {

    this.options = { headers: this.httpHeaders, params: param };

    return this.http.get(this.baseUrl + url, this.options);
  }

  ViewEntity(url: String) {
    this.options = { headers: this.httpHeaders };

    return this.http.get(this.baseUrl + url, this.options);
  }

  deleteEntity(url: String) {
    this.options = { headers: this.httpHeaders };

    return this.http.delete(this.baseUrl + url, this.options);
  }
  ////////////////////////////////////////////
  postWithFile(url: string, files: File[]) {

    let formData: FormData = new FormData();[]
    for (let i = 0; i < files.length; i++) {
      formData.append(`files[]`, files[i], files[i].name);
    }

    // if (postData !== "" && postData !== undefined && postData !== null) {
    //   for (var property in postData) {
    //     if (postData.hasOwnProperty(property)) {
    //       formData.append(property, postData[property]);
    //     }
    //   }
    // }

    return this.http.post(this.baseUrl + url, formData);
  }
}
