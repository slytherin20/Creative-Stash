import { ObjectId } from "mongodb"
export interface Product{
    _id?: MongoId;
    cat:string;
    subcat:string;
    name:string;
    brand:string;
    price:number;
    description:string;
    count:number;
    status:boolean;
    id:number;
    cloudinaryId:string
}

export interface CartDoc{
    _id:ObjectId;
    uid:string;
    cart: CartItem[]
}

export interface CartItem extends Product{
    count:number;
    status:boolean;
    cartCount:number

}
type MongoId = ObjectId | string;
export interface OrderDoc{
    _id:ObjectId;
    uid: string;
    orders: OrderItem[]
}
export interface OrderItem extends CartItem{
productId: number;
orderDate:Date;
userName:string;
phoneNo:number;
address:string
}

export interface WishistDoc extends WishlistItem{
    _id: ObjectId;
    uid:string;
    wishlist: WishlistItem[];
}

export interface WishlistItem extends Omit<Product,'id'>{
    productId:number;
    id:string;
}

export interface Brand{
    brand:string;
    cat:string;
    subcat:string;
    id:number;
}
export interface Categories{
        Paints:string[];
        'Painting Medium':string[];
        Canvas:string[];
        Brushes:string[];
        'Pens and Markers':string[];
}
export interface Address{
    _id: ObjectId;
    uid:string;
    details:{
        name:string;
        phoneNo:string;
        deliveryAddress:string;
        city:string;
        state:string;
        pinCode:string;
    }
}