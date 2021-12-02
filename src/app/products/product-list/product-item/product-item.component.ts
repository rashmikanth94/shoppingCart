import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index:number;
  @Input() sIdx:number
  showAdd:boolean;
  cartItems: Product[]=[]
  QtyList:Map<number,number>=new Map()
  currentProduct : Product;


  constructor(private router: Router,private route: ActivatedRoute,private productService:ProductService, private cartService:CartService) { }

  ngOnInit(): void {
    this.index=this.index+this.sIdx
    this.showAdd=this.cartService.showAdd(this.index);

    this.QtyList=this.cartService.getItemQty()
    this.cartService.QtyList.subscribe(
        (QtyList:Map<number,number>)=>{
            this.QtyList=QtyList;
            this.currentProduct=this.productService.getCurrentProduct(this.index)

        }
    )


  }
  quickView(){
    this.router.navigate([this.index],{relativeTo: this.route})
    this.cartService.oncartChange();
  }

  addToCart(){
    console.log(this.index)
    this.cartService.addToCart(this.index);
    this.showAdd=this.cartService.showAdd(this.index);

  }

  buttonMinus(){
    this.showAdd=this.cartService.bMinus(this.index);

  }

  buttonPlus(){
    this.cartService.addToCart(this.index);
  }

  
}
