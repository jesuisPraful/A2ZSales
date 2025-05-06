import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { ICategory } from '../models/category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[];
  categories: ICategory[];
  constructor(private _http: HttpClient) {
    this.products = [];
    this.categories = [];
  }

  getAllProducts() {
    var tempVar = this._http
      .get<IProduct[]>("https://localhost:7268/api/Product/GetProducts")
      .pipe(catchError(this.errorHandler));

    return tempVar;
    //this.products = [
    //  { "productId": "P101", "productName": "Lamborghini Gallardo Spyder", "categoryId": 1, "price": 18000000, "quantityAvailable": 10 },
    //  { "productId": "P102", "productName": "Ben Sherman Mens Necktie Silk Tie", "categoryId": 2, "price": 1847, "quantityAvailable": 20 },
    //  { "productId": "P103", "productName": "BMW Z4", "categoryId": 1, "price": 6890000, "quantityAvailable": 10 },
    //  { "productId": "P104", "productName": "Samsung Galaxy S4", "categoryId": 3, "price": 38800, "quantityAvailable": 100 }
    //];

    //return this.products;
  }

  getAllCategories() {
    var tempVar = this._http
      .get<ICategory[]>("https://localhost:7268/api/Category/GetCategories")
      .pipe(catchError(this.errorHandler));
    return tempVar;

    //this.categories = [
    //  { "categoryId": 1, "categoryName": "Motors" },
    //  { "categoryId": 2, "categoryName": "Fashion" },
    //  { "categoryId": 3, "categoryName": "Electronics" }
    //];

    //return this.categories;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
