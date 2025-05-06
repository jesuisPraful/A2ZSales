import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imgSrc: string;
  custLayout: boolean = false;
  commonLayout: boolean = false;
  role: string = "";

  constructor() {
    this.imgSrc = 'assets/quickKart.png';
    this.role = sessionStorage.getItem("Role") || "NA";
    console.log(this.role);
    if (this.role.toLowerCase() == "admin" || this.role.toLowerCase() == "na") {
      this.commonLayout = true;
    }
    else {
      this.custLayout = true;
    }
  }
}
