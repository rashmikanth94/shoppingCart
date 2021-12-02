import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed=true;

  constructor(private router: Router,
     private cartService: CartService,
     private productService:ProductService,
     private authService:AuthService) { }
  InCart= false;
  cartQuantity=0;
  isLoggedIn:boolean;

  ngOnInit(): void {
    this.cartQuantity=this.cartService.getCartQuantity();
    this.cartService.Quantity.subscribe(
      (qty:number)=>{
        this.cartQuantity=qty;
      }
    )
    this.cartService.cartpresent.subscribe(
      (x:boolean)=>{
      this.InCart=x;
    }
    )
    this.isLoggedIn=this.authService.isLoggedIn;
    this.authService.isLoggedInEmitter.subscribe(
      (x:boolean)=>{
        this.isLoggedIn=x;
      }
    )
    
  }
  showCart(){
    this.router.navigate(['/cart'])
    this.InCart=true;
    this.cartService.oncartChange();
  }
  toHome(){
    this.router.navigate(['/products'])
    this.InCart=false;
  }
  onManage(){
    this.router.navigate(['/manage'])
  }
  onFetch(){
      this.productService.fetchRecipies().subscribe()
  }
  logout(){
    this.authService.isLoggedIn=false;
    this.authService.isLoggedInEmitter.emit(this.authService.isLoggedIn)
    this.router.navigate(['/login'])
  }

}

/*
 cartItems: Map<number,Product>=new Map()
    constructor(private cartService: CartService){}

    ngOnInit(){
        this.cartItems=this.cartService.getCartItems();
        this.cartService.ItemsAdded.subscribe(
            (cartItems: Map<number,Product>)=>{
                this.cartItems=cartItems;
            }
        )
        
    }
    onDelete(id:number){
        this.cartService.deleteItem(id);
    }


     addToCart(id:number){
        if(this.ItemQty.has(id)){
            let x=this.ItemQty.get(id);
            this.ItemQty.set(id,x+1);
        }
        else{
            this.ItemQty.set(id,1);
            this.cartItems.set(id,this.productService.getCurrentProduct(id));
        }
        console.log(this.cartItems);
        this.ItemsAdded.emit(this.cartItems);
        this.Quantity.emit(this.cartItems.size)
        this.QtyList.emit(this.ItemQty);
    }
*/
