import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart.service";
import { Product } from "../products/product.model";

@Component({
    selector:'app-cart',
    templateUrl:'./cart.component.html'
})
export class cartComponent implements OnInit{
    cartItems: Product[]=[]
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


    }
    CheckOut(){
        
        this.router.navigate(['/checkout'])
        this.cartService.cartpresent.emit(false)
    }
    onDelete(id:number){
        this.cartService.deleteItem(id)
    }
    ClearCart(){
        this.cartService.clearCart()
    }
    buttonMinus(id:number){
        this.cartService.deleteSingleItem(id);
    
        
    }
    buttonPlus(id:number){
        console.log(id)
        this.cartService.addToCart2(id)
    }
}