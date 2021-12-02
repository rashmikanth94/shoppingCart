export class Product{
    public name: string;
    public description: string;
    public imgPath: string;
    public price: number;
    public id: number;

    constructor(id: number,name: string, description: string, imgPath: string, price : number){
        this.id=id;
        this.name=name;
        this.description=description;
        this.imgPath=imgPath;
        this.price=price;
    }
    
}