export default class CartView {
  
  constructor(controller) {
    this.controller = controller;
    this.order = [];
  }

  renderCard(card, vocabulary, lang){
    const modal = document.querySelector('.my-modal');
    let parentDiv = document.createElement('div');
    let abils = '';
    let disabledPlus = card.count == 0 ? 'disabled' : '';
    let icon = this.controller.model.cart[card.id] == 1 ? 'trash' : 'minus';
    let orders = [];

    abils+= `<tr><td class="cart-item"> 
                  <img src='${card.img}' class="ui tiny image">
                  <h3>${vocabulary[card.type][lang]} ${vocabulary[card.breed][lang]}</h3></td>
                  <td class="center aligned cart-quant"> <i class="plus icon large ${disabledPlus}" data-id ="${card.id}">
                  </i><span> ${this.controller.model.cart[card.id]} </span> <i class="${icon} icon large" data-id ="${card.id}"></i></td> 
                  <td class="center aligned cart-sum"> <h3>${card.price * this.controller.model.cart[card.id]} $</h3></td>
              </tr>`

    parentDiv.classList.add('cart-modal');

    parentDiv.innerHTML =`<table class="ui celled table">${abils}</table>`;

    modal.appendChild(parentDiv);

    Array.from(parentDiv.querySelectorAll('.icon')).forEach(el=>{
        el.addEventListener('click', (e)=>{
          this.controller.changeCartOrders(event.target.classList[0]);
        }); 
    });

    for(let id in this.controller.model.cart) {
      this.controller.model.data.forEach(el=>{
        if(this.controller.model.cart[id] > 0 && el.id == id) {
          orders.push(`${vocabulary[el.breed][lang]}: ${this.controller.model.cart[id]}`)
          }
      });
    }
    this.order = orders;
  }

  
  buildCarts(items, total, vocabulary, lang) {
    let totalRow = document.createElement('tr');

    document.querySelector('.my-modal').innerHTML = '';
    items.forEach(el=>{
        this.renderCard(el, vocabulary, lang);
    });

    totalRow.innerHTML = `<td colspan = '2'><h2>${vocabulary['Total'][lang]}:</h2></td><td class='cart-total'><h2>${total}$</h2></td>`;

    if(document.querySelectorAll('.table').length > 1) {
      document.querySelectorAll('.table')[document.querySelectorAll('.table').length-1].appendChild(totalRow);
      document.querySelector('.buy-button').classList.remove('disable');
      document.querySelector('.table.table-header').classList.remove('disable');
    } else {
      document.querySelector('.buy-button').classList.add('disable');
      document.querySelector('.table.table-header').classList.add('disable');
      document.querySelector('.modal.first .my-modal').innerHTML = `<h2 class="empty-cart">${vocabulary['cart is empty'][lang]}</h2>`;
    }

    
    $('.modal.first').modal({allowMultiple: false,
      closable: true,
      onDeny    : function(){
       $('.modal.firtst').modal('toggle')
      },
      onApprove : function() {
        $('.modal.firtst').modal('toggle')
        $('.modal.second').modal('toggle')
      }});    
    $('.first.modal').modal('show');
  }
  

  refreshCartIcon(cart) {
    document.querySelector('.cart-mini').innerHTML = Object.values(cart).reduce((acc, cur) => +acc + +cur);
  }
}
