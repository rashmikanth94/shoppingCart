import { EventEmitter, Injectable } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient} from "@angular/common/http";
import {  tap } from "rxjs/operators";


@Injectable()
export class ProductService{
    productsEmit= new EventEmitter<Product[]>();
    constructor(private http: HttpClient){}

    products: Product[]=[]
    jsproducts: Product[]=[]
    x:Product[]=[
        new Product(1,'iphone11',
        'the best phone ', 
        'https://images.anandtech.com/doci/16167/GEO-iPhone12ProMax-iPhone12Pro-pacific-blue-2up.png',
        100000)
       
    ];

    /*
    products: Product[]=[
        new Product(1,'iphone11',
        'the best phone ', 
        'https://images.anandtech.com/doci/16167/GEO-iPhone12ProMax-iPhone12Pro-pacific-blue-2up.png',
        100000),
        new Product(2,'iphone12',
        'the budget friendly phone ', 
        'https://specifications-pro.com/wp-content/uploads/2020/04/iPhone-12-Pro-Max.jpg',
        200000)
    ];
    */
    
    setProducts(products:Product[]){
        this.products=products;
        //this.modify(recipi)
        this.productsEmit.emit(this.products);
  
      }
    getProducts(){
        return this.products;
    }

    addProducts(product : Product){
        this.products.push(product)
        this.productsEmit.emit(this.products);
        
    }

    getCurrentProduct(x:number){
        return this.products[x];
    }
    
    storeRecipies(){
        const products=this.getProducts();
        this.http.put('https://cart-d2905-default-rtdb.firebaseio.com/products.json',products)
        .subscribe(
            response=>{
                console.log(response);
            }
        );
    }
    
    y(){
       // const products=this.getProducts();
        this.http.delete('http://localhost:3000/posts/')
        .subscribe(
            response=>{
                console.log(response);
            }
        );
    }

    fetchRecipies(){
        return this.http.get('https://cart-d2905-default-rtdb.firebaseio.com/products.json')
        .pipe(tap((products:Product[])=>{
        this.setProducts(products);
        console.log(products)
        console.log(this.products.length)
    })) 
}
    getlength(){
      return  this.products.length
    }

    postProductData(product : Product){
        this.http.post("http://localhost:3000/posts",product).subscribe(
            response=>{
                console.log(response);
            }
        )
    }
    getProductData(){
        return this.http.get("http://localhost:3000/posts")
        .pipe(tap((products:Product[])=>{
            this.setProducts(products)
            console.log(products);
        }))
    }

}