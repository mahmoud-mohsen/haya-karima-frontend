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

  constructor(private backendService: BackendService, private router: Router) {
    this.newCase = new NewCase();
  }

  ngOnInit(): void {
  }

  savePerson() {
    let url = `person`;
    this.backendService.post(this.newCase,url).subscribe((response: any) => {
      if(response.id!=null){
        this.openCaseProfile(response.id);
      }
    });
  }

  openCaseProfile(id:Number){
    this.router.navigate(['/case/profile',id]);

  }
}
