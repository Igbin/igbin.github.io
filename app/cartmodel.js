import Storage from './main.js';
import { CartView } from './view.js';


export default class CartModel {
  static cart = {};
  
  static init() {
    if(localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"))
    } else {
      Storage.data.forEach(el=>{
        this.cart[el.id] = 0;
      })
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
    CartView.refreshCart();
  }
}
  
