import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { UpdateCartComponent } from './components/update-cart/update-cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'viewProducts', component: ViewProductsComponent },
  { path: 'viewCart', component: ViewCartComponent },
  { path: 'updateCart/:pId/:pName/:qty/:qtyAvail', component: UpdateCartComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
