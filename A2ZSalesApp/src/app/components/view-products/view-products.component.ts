import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ICategory } from '../../models/category';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  products: IProduct[];
  showMessage: boolean = false;
  categories: ICategory[];
  filteredProducts: IProduct[];
  imgSrc: string;
  searchByProductName: string = "";
  searchByCategoryId: string = "0";
  showMsgDiv: boolean = false;
  custLayout: boolean = false;
  commonLayout: boolean = false;
  role: string = "";
  userName: string = "";
  errMsg: string = "";

  constructor(private _productService: ProductService, private _router: Router,
    private _userService: UserService) {
    this.products = [];
    this.categories = [];
    this.filteredProducts = [];
    this.imgSrc = "assets/add-item.jpg";
    this.role = sessionStorage.getItem("Role") || "NA";
    this.userName = sessionStorage.getItem("Email") || "NA";
    console.log(this.role);
    if (this.role.toLowerCase() == "admin" || this.role.toLowerCase() == "na") {
      this.commonLayout = true;
    }
    else {
      this.custLayout = true;
    }
  }

  ngOnInit() {

    this._productService
      .getAllProducts()
      .subscribe(
        (resSuccess) => {
          this.products = resSuccess;
          this.filteredProducts = this.products;

          if (this.products.length == 0) {
            this.showMessage = true;
          }
        },
        (resError) => {
          this.showMessage = true;
          this.products = [];
          this.filteredProducts = [];
          console.log(resError);
        },
        () => { console.log("Get products executed successfully."); }
    );

    this._productService
      .getAllCategories()
      .subscribe(
        (resSuccess) => {
          this.categories = resSuccess;
        },
        (resError) => {
          this.categories = [];
          console.log(resError);
        },
        () => { console.log("Get categories executed successfully"); }
    );

    //this.products = this._productService.getAllProducts();
    //this.categories = this._productService.getAllCategories();

    //this.products = [
    //  { "productId": "P101", "productName": "Lamborghini Gallardo Spyder", "categoryId": 1, "price": 18000000, "quantityAvailable": 10 },
    //  { "productId": "P102", "productName": "Ben Sherman Mens Necktie Silk Tie", "categoryId": 2, "price": 1847, "quantityAvailable": 20 },
    //  { "productId": "P103", "productName": "BMW Z4", "categoryId": 1, "price": 6890000, "quantityAvailable": 10 },
    //  { "productId": "P104", "productName": "Samsung Galaxy S4", "categoryId": 3, "price": 38800, "quantityAvailable": 100 }
    //];

    //this.categories = [
    //  { "categoryId": 1, "categoryName": "Motors" },
    //  { "categoryId": 2, "categoryName": "Fashion" },
    //  { "categoryId": 3, "categoryName": "Electronics" }
    //];
    //this.filteredProducts = this.products;

    //if (this.products.length == 0) {
    //  this.showMessage = true;
    //}
    
  }

  searchProductByCategory(categoryId: string) {
    if (this.searchByProductName != null || this.searchByProductName == "") {
      this.filteredProducts = this.products.filter(prod => prod.productName.toLowerCase().indexOf(this.searchByProductName.toLowerCase()) >= 0);
    }
    else {
      this.filteredProducts = this.products;
    }
    this.searchByCategoryId = categoryId;
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = this.filteredProducts.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
    }
  }

  searchProduct(productName: string) {
    if (this.searchByCategoryId == "0") {
      this.filteredProducts = this.products;
    }
    else {
      this.filteredProducts = this.products.filter(prod => prod.categoryId.toString() == this.searchByCategoryId);
    }
    if (productName != null || productName == "") {
      this.searchByProductName = productName;
      this.filteredProducts = this.filteredProducts.filter(prod => prod.productName.toLowerCase().indexOf(productName.toLowerCase()) >= 0);
    }
    if (this.filteredProducts.length == 0) {
      this.showMsgDiv = true;
    }
    else {
      this.showMsgDiv = false;
    }
  }

  addToCart(product: IProduct) {
    if (this.role == null || this.role == "NA") {
      this._router.navigate(['/login']);
    }
    else {
      this._userService.addProductToCart(product.productId,
        this.userName)
        .subscribe(
          (success) => {
            if (success) {
              alert("Product added to cart!");
            }
          },
          (error) => {
            this.errMsg = error,
              console.log(this.errMsg),
              alert("Sorry, something went wrong. Please try again after sometime.")
          },
          () => { console.log("Add to cart executed"); }
      );
    }
  }
}
