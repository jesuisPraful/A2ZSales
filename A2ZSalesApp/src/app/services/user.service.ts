import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../models/user';
import { ICart } from '../models/cart';
import { ICartProduct } from '../models/cartProduct';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  validateCredentials(emailId: string, password: string) {
    var userObj: IUser = {
      emailId: emailId,
      userPassword: password,
      roleId: 0,
      gender: "",
      address: "",
      dateOfBirth: new Date()
    };
    console.log(userObj);

    let response = this._http.post<string>("https://localhost:7268/api/User/ValidateUserCredentials",
      userObj).pipe(catchError(this.errorHandler));
    return response;
  }

  registerUser(emailId: string, userPassword: string, gender: string, dateOfBirth: Date): Observable<boolean> {
    var userObj: IUser;
    userObj = { emailId: emailId, userPassword: userPassword, gender: gender, roleId: 2, dateOfBirth: dateOfBirth, address: "" };
    return this._http.post<boolean>('https://localhost:7268/api/User/InsertUserDetails', userObj)
      .pipe(catchError(this.errorHandler));
  }

  addProductToCart(productId: string, emailId: string): Observable<boolean> {
    var cartObj: ICart;
    cartObj = { productId: productId, emailId: emailId, quantity: 1 };
    return this._http.post<boolean>('https://localhost:7268/api/User/AddProductToCart', cartObj).pipe(catchError(this.errorHandler));
  }

  getCartProducts(emailId: string): Observable<ICartProduct[]> {
    let param = "?emailId=" + emailId;
    return this._http.get<ICartProduct[]>('https://localhost:7268/api/User/GetCartProducts' + param).pipe(catchError(this.errorHandler));
  }


  updateCartProduct(emailId: string, productId: string, qty: number): Observable<boolean>{
    var cartObj: ICart = {
      productId: productId,
      emailId: emailId,
      quantity:qty
    };

    var response = this._http.put<boolean>("https://localhost:7268/api/User/UpdateCartProducts", cartObj)
      .pipe(catchError(this.errorHandler));
    return response;
  }

  deleteCartProduct(productId: string, emailId: string) {
    var cartObj: ICart = {
      productId: productId,
      emailId: emailId,
      quantity: 0
    };
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      body: cartObj
    };
    var response = this._http.delete<boolean>("https://localhost:7268/api/User/DeleteCartProduct", httpOptions)
      .pipe(catchError(this.errorHandler));
    return response;

  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
