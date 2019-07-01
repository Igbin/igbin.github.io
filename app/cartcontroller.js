import Storage from './main.js';
import AnimalController from './controller.js';
import {View, CartView} from './view.js';
import CartModel from './cartmodel.js';


export default class CartController {

  static  changeCount(direction) {
    let dir = direction == 'plus' ? -1 : 1;

    Storage.data.forEach(el=>{
      if(el.id == event.target.dataset.id){
        if(direction == 'plus' && el.count != 0) {
        el.count = el.count + dir;
        CartModel.cart[el.id] = CartModel.cart[el.id] - dir;
        } else if(direction != 'plus' &&  CartModel.cart[el.id] != 0){
          el.count = el.count + dir;
          CartModel.cart[el.id] = CartModel.cart[el.id] - dir;
        }
        localStorage.cart = JSON.stringify(CartModel.cart);
        localStorage.data = JSON.stringify(Storage.data);
      }
    })
  document.querySelector('.my-modal').innerHTML = '';
  this.buildCarts();
  document.querySelector('.ui.special.cards').innerHTML = '';
  AnimalController.buildCards(Storage.data);
  CartView.refreshCart();
}


  static buildCarts() {
    let total = 0;
    let totalRow = document.createElement('tr');
    let buyButton = document.createElement('button');
    buyButton.classList.add('fluid', 'ui', 'button' , 'buy-button');
    buyButton.appendChild(document.createTextNode('BUY'))

    document.querySelector('.my-modal').innerHTML = '';
    Storage.data.forEach(el=>{
     if(CartModel.cart[el.id] != 0) {
        CartView.renderCard(el);
        total = total + el.price * CartModel.cart[el.id];
      }
    })

    document.querySelector('.modal .header').innerHTML = 'Cart';
    totalRow.innerHTML = `<td colspan = '2'><h2>Total:</h2></td><td class='cart-total'><h2>${total}$</h2></td>`

    if(document.querySelectorAll('.table').length > 1) {
      document.querySelectorAll('.table')[document.querySelectorAll('.table').length-1].appendChild(totalRow);
      document.querySelector('.my-modal').appendChild(buyButton);
      document.querySelector('.buy-button').addEventListener('click', AnimalController.buy);
    } else {
      document.querySelector('.modal .header').innerHTML = 'cart is empty';
    }

    // $('.ui.longer.modal').modal({blurring: true}).modal('show');
    $('.coupled.modal').modal({allowMultiple: false});
    $('.second.modal').modal('attach events', '.first.modal .button');
    $('.first.modal').modal('show');
  }
}