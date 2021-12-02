import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './products/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { DropdownDirective } from './dropdown.directive';
import { cartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { checkOutComponent } from './checkout/checkout.component';
import { productAddComponent } from './products/product-add/productAdd.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExampleComponent } from './example/example.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { signupComponent } from './signup/signup.component';
import { loginComponent } from './login/login.component';
import { AuthService } from './auth.service';
const appRoutes: Routes=[
  {path:'' , redirectTo: '/signup',pathMatch: 'full' },

  {path:'products' , component : ProductsComponent},
  {path:'products/:id', component: ProductDetailComponent},

  {path:'cart',component: cartComponent},
  {path:'checkout',component:checkOutComponent},
  {path:'manage',component:productAddComponent},
  {path:'login',component:loginComponent},
  {path:'signup',component:signupComponent}




]
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    HeaderComponent,
    ProductStartComponent,
    DropdownDirective,
    cartComponent,
    checkOutComponent,
    productAddComponent,
    ExampleComponent,
    signupComponent,
    loginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatPaginatorModule,

    RouterModule.forRoot(appRoutes),
    

    BrowserAnimationsModule
  ],
  providers: [ProductService,CartService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
