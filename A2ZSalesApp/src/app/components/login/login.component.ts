import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;
  showDiv: boolean;
  constructor(private _userService: UserService,
    private _router: Router) {
    this.message = "";
    this.showDiv = false;
  }

  login(form: NgForm) {
    console.log(form.value.email);
    console.log(form.value.password);

    this._userService.validateCredentials(form.value.email,
      form.value.password)
      .subscribe(
        (resSuccess) => {
          console.log(resSuccess);
          //Admin, Customer, Invalid credentials
          if (resSuccess.toString().toLowerCase() != "invalid credentials") {
            sessionStorage.setItem("Email", form.value.email);
            sessionStorage.setItem("Role", resSuccess.toString());
            this._router.navigate(['/home']);
          }
          else {
            this.message = "Invalid credentials! Please try again!";
            this.showDiv = true;
          }
        },
        (resError) => {
          console.log(resError);
          this.message = "Some error occured";
          this.showDiv = true;
        },
        () => { console.log("Validate credentials executed"); }
    );
  }
}
