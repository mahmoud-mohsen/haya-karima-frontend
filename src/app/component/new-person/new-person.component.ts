import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { NewCase } from '../../models/newCase.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {
  newCase: NewCase;
  errors: String[] = new Array();
  constructor(private backendService: BackendService, private router: Router) {
    this.newCase = new NewCase();
  }

  ngOnInit(): void {
  }

  savePerson() {
    this.errors = new Array();
    if (this.newCase.name == null) {
      this.errors.push("يجب ادخال الاسم");
    }
    if (this.newCase.code == null || this.newCase.code.length != 14) {
      this.errors.push("ادخل رقم قومي صحيح");
    }

    if (this.newCase.phoneNumber == null || !(this.newCase.phoneNumber.length == 11 || this.newCase.phoneNumber.length == 10)) {
      this.errors.push("ادخل رقم هاتف صحيح");
    }

    if (this.newCase.address == null) {
      this.errors.push("يجب ادخال العنوان");
    }

    if (this.newCase.dateOfBirth == null) {
      this.errors.push("يجب ادخال تاريخ الميلاد");
    }

    if (this.newCase.gender == null) {
      this.errors.push("يجب ادخال النوع");
    }
    console.log(this.newCase);

    if (this.errors.length == 0) {
      let url = `person`;
      this.backendService.post(this.newCase, url).subscribe((response: any) => {
        if (response.id != null) {
          this.openCaseProfile(response.id);
        }
      });
    }
  }

  openCaseProfile(id: Number) {
    this.router.navigate(['/case/profile', id]);

  }
}
