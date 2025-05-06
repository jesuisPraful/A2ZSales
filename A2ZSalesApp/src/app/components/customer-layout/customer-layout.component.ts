import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent {
  constructor(private _router: Router) {

  }

  logOut() {
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");
    //sessionStorage.clear();
    this._router.navigate(['']);
  }
}
