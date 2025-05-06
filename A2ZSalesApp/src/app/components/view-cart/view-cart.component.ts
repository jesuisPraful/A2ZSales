import { Component } from '@angular/core';
import { ICartProduct } from '../../models/cartProduct';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent {
  errorMsg: string = "";
  emailId: string = "";
  products: ICartProduct[] = [];
  showError: boolean = false;
  status: boolean = false;
  imageSrc: string = "";

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
    //console.log("in");
    this.emailId = sessionStorage.getItem('Email') || "NA";

    if (this.emailId == null || this.emailId == "NA") {
      this.router.navigate(['/login']);
    }
    this._userService.getCartProducts(this.emailId)
      .subscribe(
        responseCartProductData => {
          this.products = responseCartProductData;
          if (this.products.length == 0) {
            this.showError = true;
            this.errorMsg = "Your cart is empty.";
          }
        },
        responseCartProductError => {
          this.products = [];
          this.errorMsg = responseCartProductError;
          console.log(this.errorMsg);
          if (this.products.length == 0) {
            this.showError = true;
            this.errorMsg = "No records found.";
          }
        },
        () => console.log("GetCartProducts method executed successfully")
      );

  }


  updateCart(cartProduct: ICartProduct) {
    this.router.navigate(['/updateCart', cartProduct.productId, cartProduct.productName, cartProduct.quantity, cartProduct.quantityAvailable]);
  }


  removeProductFromCart(cartProduct: ICartProduct) {
    this._userService.deleteCartProduct(cartProduct.productId, this.emailId)
      .subscribe(
        (resSuccess) =>
        {
          if (resSuccess) {
            alert("Product removed from cart successfully");
            this.ngOnInit();
          }
          else {
            alert("Could not remove product from cart");
          }
          this.router.navigate(['/viewCart'])
        },
        (resError) => {
          console.log(resError);
          alert("Some error Occured");
          this.router.navigate(['/viewCart'])
        },
        () => { console.log("Delete Product Executed") }

    );
  }
}
