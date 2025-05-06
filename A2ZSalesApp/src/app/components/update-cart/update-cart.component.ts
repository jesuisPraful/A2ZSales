import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.css']
})
export class UpdateCartComponent implements OnInit{
  productId: string = "";
  productName: String = "";
  qunatity: number = 0;
  qunatityAvailaible: number = 0;
  email: string = "";

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    
  }
  ngOnInit(): void {
    this.productId = this._route.snapshot.params['pId'];
    this.productName = this._route.snapshot.params['pName'];
    this.qunatity = parseInt(this._route.snapshot.params['qty']);
    this.qunatityAvailaible = parseInt(this._route.snapshot.params['qtyAvail']);
    this.email = sessionStorage.getItem("Email") || "NA";

    if (this.email == "NA" || this.email == null) {
      this._router.navigate(['/login']);
    }

  }

  UpdateCartProduct(newQunatity: number) {
    this._userService.updateCartProduct(this.email, this.productId, newQunatity)
      .subscribe(
        (responsesSuccess) => {
          if (responsesSuccess) {
            alert("Cart updated")
          }
          else {
            alert("Cart not updated");
          }
        },
        (responseError) => {
          console.log(responseError);
          alert("Some error occured");
          this._router.navigate(['/viewCart'])
        },
        () => { console.log("Cart updated successfully") }
      );
  }
}
