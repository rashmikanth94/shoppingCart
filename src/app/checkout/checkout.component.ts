import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart.service";
import { Product } from "../products/product.model";

@Component({
    selector:'app-chechkout',
    templateUrl:'./checkout.component.html'
})

export class checkOutComponent implements OnInit{
    cartItems: Product[]=[]
    totalPrice=0;
    QtyList:Map<number,number>=new Map()   
    constructor(private cartService: CartService, private router: Router){}
    ngOnInit(){
        this.cartItems=this.cartService.getCartItems()
        
        this.cartService.ItemsAdded.subscribe(
            (cartIte:Product[])=>{
                this.cartItems=cartIte
            }
        )
        this.QtyList=this.cartService.getItemQty()
        this.cartService.QtyList.subscribe(
            (QtyList:Map<number,number>)=>{
                this.QtyList=QtyList;
            }
        )   
        this.totalPrice=this.cartService.calculateTotalPrice()
        this.cartService.price.subscribe(
            (x:number)=>{
                this.totalPrice=x;
            }
        )
     }
     onOrderPlaced(){
         this.cartService.clearCart()
        this.router.navigate(['/products'])
     }
}