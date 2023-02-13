import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CasesFilterModel } from '../../models/casesFilter.model';
import { BackendService } from 'src/app/services/backend.service';
import { Component, OnInit } from '@angular/core';
import * as Excel from "exceljs";
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.css']
})
export class CasesListComponent implements OnInit {
  page = 1;
  itemsPerPage = 20;
  totalItems: any;

  cases: CasesFilterModel[];

  filterParma: Map<String, String> = new Map<String, String>();
  filter: Map<String, String> = new Map<String, String>();
  transale: Map<String, String> = new Map<String, String>();

  searchKey: string;
  searchValue: string;
  excelFileName: String;
  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.transale.set("name", "الاسم");
    this.transale.set("address", "العنوان");
    this.transale.set("code", "الرقم القومي");
    this.transale.set("phoneNumber", "رقم الهاتف");
    this.transale.set("gender", "النوع");
    this.transale.set("age", "العمر");
    this.transale.set("MALE", "ذكر");
    this.transale.set("FEMALE", "انثي");
    this.transale.set("true", "نعم");
    this.transale.set("false", "لا");
    this.transale.set("noFather", "يتيم الاب");
    this.transale.set("noMother", "يتيم الام");

    this.gty(this.page);
  }

  getAge(dateOfBirth: number) {
    let timeDiff = Math.abs(Date.now() - dateOfBirth);
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
  }

  openCaseProfile(id: Number) {
    this.router.navigate(['/case/profile', id]);

  }

  gty(page: any) {
    this.page = page;
    this.page--;
    let url = `person/search?page=${this.page}&size=${this.itemsPerPage}`;
    this.backendService.ViewEntities(url, this.filterParma).subscribe((data: any) => {
      this.cases = data.content;
      this.totalItems = data.totalElements;
    })
  }

  addFilter() {
    if (this.searchKey != null && this.searchKey.length != 0 && this.searchValue != null && this.searchValue.length != 0) {
      this.filterParma[this.searchKey] = this.searchValue;
      this.filter.set(this.searchKey, this.searchValue);
      this.filterTable();
      this.searchKey = null;
      this.searchValue = null;
    }
  }

  removeFilter(item) {
    delete this.filterParma[item.key];
    this.filter.delete(item.key);
    this.filterTable();
  }

  filterTable() {
    this.gty(1);
  }


  transalateText(key) {
    if (this.transale.get(key) != null) {
      return this.transale.get(key);
    } else {
      return key;
    }
  }

  async downloadExcel() {
    const date = new Date()
      .toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("/");
    console.log(date);
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    worksheet.columns = [
      { header: "الرقم التسلسلي", key: "id", width: 5 , style: { alignment:{horizontal:'center'}}},
      { header: "الاسم", key: "name", width: 32 ,style: { alignment:{horizontal:'center'}}},
      { header: "الرقم القومي", key: "code", width: 25 ,style: { alignment:{horizontal:'center'}}},
      { header: "رقم الهاتف", key: "phoneNumber", width: 20 ,style: { alignment:{horizontal:'center'}}},
      { header: "العنوان", key: "address", width: 32 ,style: { alignment:{horizontal:'center'}}},
      { header: "النوع", key: "gender", width: 15 ,style: { alignment:{horizontal:'center'}}},
      { header: "العمر", key: "age", width: 15 ,style: { alignment:{horizontal:'center'}}},
      { header: "تاريخ الميلاد", key: "dateOfBirth", width: 20 ,style: { alignment:{horizontal:'center'}}},

    ];
    this.cases.forEach(e => {
      worksheet.addRow({
        id: e.id,
        name: e.name,
        code: e.code,
        phoneNumber: e.phoneNumber,
        address: e.address,
        gender: e.gender,
        age: this.getAge(e.dateOfBirth),
        dateOfBirth: formatDate(new Date(parseInt(e.dateOfBirth.toString(), 10)), 'dd-MM-yyyy', 'en-US').toString(),
      }, "n");
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display: none");
      a.href = url;
      if (this.excelFileName == null) {
        this.excelFileName = "excel-" +date;
      }
      a.download = this.excelFileName + ".xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    });
  }
}


