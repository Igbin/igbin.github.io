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

    document.querySelector('.my-modal').innerHTML = '';
    Storage.data.forEach(el=>{
     if(CartModel.cart[el.id] != 0) {
        CartView.renderCard(el);
        total = total + el.price * CartModel.cart[el.id];
      }
    })

    totalRow.innerHTML = `<td colspan = '2'><h2>Total:</h2></td><td class='cart-total'><h2>${total}$</h2></td>`

    if(document.querySelectorAll('.table').length > 1) {
      // document.querySelector('.modal .header').innerText = 'cart';
      document.querySelectorAll('.table')[document.querySelectorAll('.table').length-1].appendChild(totalRow);
      document.querySelector('.buy-button').classList.remove('disable');
      document.querySelector('.table.table-header').classList.remove('disable');
    } else {
      document.querySelector('.buy-button').classList.add('disable');
      document.querySelector('.table.table-header').classList.add('disable');
      document.querySelector('.modal.first .my-modal').innerHTML = '<h2 class="empty-cart">cart is empty</h2>';
    }

    $('.modal.first').modal({allowMultiple: false,
      cosable: true,
      onDeny    : function(){
       $('.modal.firtst').modal('toggle')
      },
      onApprove : function() {
        $('.modal.firtst').modal('toggle')
        $('.modal.second').modal('toggle')
      }});
    // $('.second.modal').modal('attach events', '.first.modal .button');
    $('.first.modal').modal('show');
  }
}