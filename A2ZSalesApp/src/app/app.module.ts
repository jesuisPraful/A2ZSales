import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { DemoComponent } from './components/demo/demo.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonLayoutComponent } from './components/common-layout/common-layout.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerLayoutComponent } from './components/customer-layout/customer-layout.component';
import { UpdateCartComponent } from './components/update-cart/update-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductsComponent,
    DemoComponent,
    LoginComponent,
    CommonLayoutComponent,
    ViewCartComponent,
    HomeComponent,
    CustomerLayoutComponent,
    UpdateCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, HttpClientModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
