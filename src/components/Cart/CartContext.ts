import { createContext } from "react";
import { CartItem } from "../../interfaces/app_interface";

const CartContext = createContext<CartItem[]>([]);

export default CartContext;
