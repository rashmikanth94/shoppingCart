import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
    selector:'app-product-add',
    templateUrl:'./productAdd.component.html'
})
export class productAddComponent{
    @ViewChild('e') editForm: NgForm;
    addProd: Product;
    constructor(private productService: ProductService, private router:Router){}
    onAdding(){
        //this.productService.y()
        
        console.log(this.editForm.value);
        this.addProd=new Product(Number(this.productService.getlength())+1,this.editForm.value.name,this.editForm.value.Description,this.editForm.value.ImgPath,this.editForm.value.price);   
        this.productService.addProducts(this.addProd);
        this.productService.storeRecipies()
        //this.router.navigate(['/products'])
        this.productService.postProductData(this.addProd)
        window.alert("Product added succesfully");        
        this.editForm.reset()
    }
}