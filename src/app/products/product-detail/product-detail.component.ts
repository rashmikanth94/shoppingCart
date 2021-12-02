import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  x=true;
  currentProduct : Product;
  QtyList:Map<number,number>=new Map()
  cartItems: Product[]=[]
  ItemInCart=false;

  constructor(private router:Router, private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }


  ngOnInit(): void {
    
    this.ItemInCart=false;
    this.route.params.subscribe(
      (params : Params)=>{

      this.id= +params['id'];
      this.currentProduct=this.productService.getCurrentProduct(this.id)
        this.ItemInCart=this.cartService.checkElement(this.id);
      }
    )
    this.QtyList=this.cartService.getItemQty()
    this.cartService.QtyList.subscribe(
        (QtyList:Map<number,number>)=>{
            this.QtyList=QtyList;
        }
    )

    this.cartItems=this.cartService.getCartItems()
        
    this.cartService.ItemsAdded.subscribe(
        (cartIte:Product[])=>{
            this.cartItems=cartIte
        }
    )
    this.buttonchange()


  }

  addToCart(){
    this.cartService.addToCart(this.id);
    this.buttonchange()

  }

  showCart(){
    this.router.navigate(['/cart'])
    
  }

  buttonchange(){
    this.ItemInCart=this.cartService.checkElement(this.id)
  }
  buttonMinus(){
    
    let x=this.productService.getCurrentProduct(this.id).id;
    this.cartService.deleteSingleItem(x);
    this.cartService.chckele.subscribe(
      (x:boolean)=>{
        this.ItemInCart=x;
      }
    )
  }

  buttonPlus(){
    this.cartService.addToCart(this.id);
  }
}
