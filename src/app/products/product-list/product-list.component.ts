import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import {PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  @Output() sIdx=new EventEmitter<number>();
  @Output() eIdx=new EventEmitter<number>();
  startIndex:number=0;
  constructor(private productService: ProductService) { }
  pageSlice:Product[]
  ngOnInit(): void {
    this.products=this.productService.getProducts();
    this.pageSlice=this.products.slice(0,4)

    this.productService.productsEmit.subscribe(
      (products:Product[])=>{
        this.products=products
        this.pageSlice=this.products.slice(0,4)

      }
    )
    console.log("x")
    console.log(this.pageSlice)

  }


  onPageChange(event : PageEvent){
    const startIndex= event.pageIndex * event.pageSize;
    let endIndex =startIndex + event.pageSize;
    if(endIndex > this.products.length){
      endIndex=this.products.length
    }
    this.pageSlice=this.products.slice(startIndex,endIndex);
    console.log(startIndex)
    this.startIndex=startIndex
  }


}
