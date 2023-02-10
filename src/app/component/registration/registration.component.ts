import { Router } from '@angular/router';
import { BackendService } from './../../services/backend.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  address1: string;
  address2: string;
  phone1: string;
  phone2: string;
  rolesAccept: Boolean;
  image;
  imgURL: any;

  constructor(private backendService: BackendService, private router: Router) { 
    this.imgURL="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg";
  }

  ngOnInit(): void {
  }

  registr() {


    if (this.rolesAccept == true) {

      if (this.password == this.confirmPassword) {
        let body = { "username": this.username, "password": btoa(this.password), "fullName": this.fullName, "image": this.image, "address1": this.address1, "address2": this.address2, "phoneNumber1": this.phone1, "phoneNumber2": this.phone2 };
        let url = `registration`;

        this.backendService.post(body, url).subscribe(() => {
          this.router.navigate([`home`]);
        });
      } else {
        alert("كلمة السر مختلفتان");
      }

    } else {
      alert("يجب الموافقه على الشروط");
    }
  }

  prepareImage(image) {
    var file: File = image.files[0];
    if(file){
      this.preview(file)
    }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(file);

  }

  preview(file) {
     var reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
}
