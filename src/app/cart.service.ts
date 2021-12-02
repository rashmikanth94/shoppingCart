import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Product } from "./products/product.model";
import { ProductService } from "./products/product.service";

@Injectable()
export class CartService implements OnInit{
    cartItems: Product[]=[]
    cart: boolean=false;
    cartpresent=new EventEmitter<boolean>();

    price=new EventEmitter<number>();
    ItemsAdded=new EventEmitter<Product[]>();
    Quantity= new EventEmitter<number>();
    QtyList= new EventEmitter<Map<number,number>>();
    ItemQty:Map<number,number>=new Map();
    totalPrice=0;
    
    chckele=new EventEmitter<boolean>();
    currentSelectedProduct: Product;
    constructor(private productService: ProductService){}
    ngOnInit(){

    }
    addToCart(id:number){
        let cur=this.productService.getCurrentProduct(id)
        if(this.ItemQty.has(cur.id)){
            let curqty=this.ItemQty.get(cur.id)
            this.ItemQty.set(cur.id,curqty+1)
        }

        else{
            this.cartItems.push(cur)
            this.ItemQty.set(cur.id,1)
        }
        this.ItemsAdded.emit(this.cartItems.slice());
        this.Quantity.emit(this.cartItems.length)
        this.QtyList.emit(this.ItemQty);
        //console.log(this.cartItems)
        console.log(this.ItemQty)

    }
    oncartChange(){
        this.cart=true;
        this.cartpresent.emit(true)
    }
    addToCart2(id:number){
        if(this.ItemQty.has(id)){
            let curqty=this.ItemQty.get(id)
            this.ItemQty.set(id,curqty+1)
            this.QtyList.emit(this.ItemQty);

        }
    }
    getCartItems(){
        return this.cartItems;
    }
    
    getCartQuantity(){
        return this.cartItems.length;
    }
    getItemQty(){
        return this.ItemQty;
    }

    deleteItem(id:number){
        let cur=this.cartItems[id].id;
        this.cartItems.splice(id,1);
        this.ItemQty.delete(cur);
        this.QtyList.emit(this.ItemQty);
        this.ItemsAdded.emit(this.cartItems.slice());
        this.Quantity.emit(this.cartItems.length)

       // console.log(this.cartItems)
        //console.log(this.ItemQty)
        this.chckele.emit(false);

    }

    checkElement(id:number){
        //console.log(id)
        //console.log(this.cartItems[id]);
        
        let cur=this.productService.getCurrentProduct(id).id;
        if( this.ItemQty.has(cur)){
            return true
        }
        
        return false
    }
    

    deleteSingleItem(id:number){
        //let cur=this.productService.getCurrentProduct(id).id;
        if(this.ItemQty.get(id)===1){

            for(let i of this.cartItems){
                if(i.id==id){
                    var delidx=this.cartItems.indexOf(i)
                    this.cartItems.splice(delidx,1)
                    this.ItemQty.delete(id);

                }
                this.QtyList.emit(this.ItemQty);
                this.ItemsAdded.emit(this.cartItems.slice());
                this.Quantity.emit(this.cartItems.length)
                this.chckele.emit(false);

            }

            //this.deleteItem(id)
        }
        else{
            let curqty=this.ItemQty.get(id)
            this.ItemQty.set(id,curqty-1)
            
        }
        console.log(this.ItemQty)

    }
    checkForButton(id){
        let x:boolean
        if(this.ItemQty.get(id)){
            this.chckele.emit(true)
        }
        else{
            this.chckele.emit(false)
        }
    }
    calculateTotalPrice(){
        this.totalPrice=0;
        for(let i of this.cartItems){
            this.totalPrice=Number(this.totalPrice) + Number(i.price)*this.ItemQty.get(i.id);
        }
        return this.totalPrice;
        this.price.emit(this.totalPrice);
    }
    clearCart(){
        this.cartItems=[]
        this.ItemsAdded.emit(this.cartItems.slice());
        this.Quantity.emit(0)
        this.ItemQty.clear()
        this.QtyList.emit(this.ItemQty);
    }


    showAdd(id:number){
        let cur=this.productService.getCurrentProduct(id).id;
        if(this.ItemQty.has(cur)) {
            return true
        }
        return false;
               
    }
    bMinus(index:number){
        let cur=this.productService.getCurrentProduct(index).id;
        if(this.ItemQty.get(cur)==1){
            for(let i of this.cartItems){

                if(i.id==cur){
                    var delidx=this.cartItems.indexOf(i)
                    this.cartItems.splice(delidx,1)
                    this.ItemQty.delete(cur);
                }

            }
        }   
        else{
            let curqty=this.ItemQty.get(cur)
            this.ItemQty.set(cur,curqty-1)
        }
        this.QtyList.emit(this.ItemQty);
        this.ItemsAdded.emit(this.cartItems.slice());
        this.Quantity.emit(this.cartItems.length)
        return this.showAdd(index)
        

    }
}