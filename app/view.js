

export  class View {

  constructor(controller) {
    this.controller = controller;
  }

   renderCard(card){
    const rowCards = document.querySelector('.ui.special.cards');
    let parentDiv = document.createElement('div');
    let abils = '';
    let disabled = card.count == 0 ? 'disabled' : '';

    for(let key in card) {
      if(key != 'price' && key != 'count' && key != 'breed' && key != 'id' && key!= 'img') {
        abils += `<p>${this.controller.convertToLang(key)}:  ${this.controller.convertToLang(card[key])}</p>`
      } 
    }
    parentDiv.classList.add('card');
    parentDiv.dataset.id = card.id;
    parentDiv.innerHTML =`<div class="blurring dimmable image ui" data-tooltip="Click me to see description">
                            <div class="ui  dimmer">
                              <div class="content">
                                 ${abils}
                              </div>
                            </div>
                            <img class="ui image ${disabled}" src='${card.img}'>
                          </div>
                          <div class="content">
                            <p class="header">${this.controller.convertToLang(card.breed)}</p>
                            <div class="meta">
                              <h4>${this.controller.convertToLang('count')}: ${card.count}</h4>
                            </div>
                          </div>
                          <div class="extra content">
                          <h4>${this.controller.convertToLang('price')}: ${card.price}$</h4>
                          </div>
                          <div class="ui bottom attached animated fade button cart-button ${disabled}" data-id ="${card.id}">
                          <div class ="visible content">
                            <i class="add icon"></i>
                            <i class="shopping cart icon"></i>
                          </div>
                          <div class="hidden content">Add to Cart</div>  
                          </div>
                        </div>`;

    rowCards.appendChild(parentDiv);

    parentDiv.querySelector('.cart-button').addEventListener('click', (e)=>{
      this.controller.addToCart(event.currentTarget.dataset.id)
    });

    $('.special.cards .image').dimmer({
      on: 'click'
    });
  }  


  refreshQuantity(id, count) {
    let parent = Array.from(document.querySelectorAll('.card'));
    parent.some(el=>{
      if(el.dataset.id == id)
       return  parent = el;
    });  
      if(count == 0) {
        parent.querySelector('.button').classList.add('disabled');
        parent.querySelector('.image').classList.add('disabled');
        parent.querySelector('.meta').innerHTML = `<h4'>${this.controller.convertToLang('Sold')}</h4>`;
      } else {  
        parent.querySelector('.button').classList.remove('disabled');
        parent.querySelector('.image').classList.remove('disabled');
        parent.querySelector('.meta').innerHTML = `<h4>${this.controller.convertToLang('count')}: ${count}</h4>`;
      }  
  }

  
  addListeners() {

    Array.from(document.querySelectorAll('.lang')).forEach(el => {
      el.addEventListener('click', (e) => {
        this.controller.changeLang(el.dataset.lang);
      });
    });

    document.querySelector('.myModale').addEventListener('click', this.controller.renderCart.bind(this.controller));

    document.querySelector('.sign-in').addEventListener('click', this.signIn.bind(this));

    document.querySelector('.sign-out').addEventListener('click',  this.controller.signOut.bind(this.controller));

    const addListenerMulti = (el, s, fn) => {
      s.split(' ').forEach(e => el.addEventListener(e, fn, false));
    };

    addListenerMulti(document.querySelector('.ui.search'), 'click keyup', (e) =>{
      if(document.querySelector('.prompt').value == "" && e.type == 'keyup') {
        document.querySelector('.ui.special.cards').innerHTML = '';
        return this.controller.buildCards(this.controller.model.data);
      } 
      if(event.target.tagName === 'A' || event.target.classList.contains('title') || event.target.classList.contains('name')){
        this.controller.searchFilter();
      }
    });

    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(el => {
      el.onchange =  this.filter;
    }); 

    document.querySelector('.form').addEventListener('submit', this.controller.buy.bind(this.controller));

    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
  }

  signIn() {
    this.controller.buildCards(this.controller.model.data)
    $('.intro').transition('fade down');
    Array.from(document.querySelectorAll('.sign-in, .mini-cart, .ui.search, .ui.grid, a.item.header-but')).forEach((el)=>{
      el.classList.toggle('disable');
    });
    this.controller.prepareSearchData();
  }
}

export class CartView {
  
  constructor(controller) {
    this.controller = controller;
    this.order = [];
  }

  renderCard(card){
    const modal = document.querySelector('.my-modal');
    let parentDiv = document.createElement('div');
    let abils = '';
    let disabledPlus = card.count == 0 ? 'disabled' : '';
    let icon = this.controller.model.cart[card.id] == 1 ? 'trash' : 'minus';
    let orders = [];

    abils+= `<tr><td class="cart-item"> 
                  <img src='${card.img}' class="ui tiny image">
                  <h3>${this.controller.convertToLang(card.type)} ${this.controller.convertToLang(card.breed)}</h3></td>
                  <td class="center aligned cart-quant"> <i class="plus icon large ${disabledPlus}" data-id ="${card.id}"></i><span> ${this.controller.model.cart[card.id]} </span> <i class="${icon} icon large" data-id ="${card.id}"></i></td> 
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
          orders.push(`${this.controller.convertToLang(el.breed)}:${this.controller.model.cart[id]}`)
          }
      });
    }
    this.order = orders;
  }

  
  buildCarts(items, total) {
    let totalRow = document.createElement('tr');

    document.querySelector('.my-modal').innerHTML = '';
    items.forEach(el=>{
        this.renderCard(el);
    });

    totalRow.innerHTML = `<td colspan = '2'><h2>Total:</h2></td><td class='cart-total'><h2>${total}$</h2></td>`

    if(document.querySelectorAll('.table').length > 1) {
      document.querySelectorAll('.table')[document.querySelectorAll('.table').length-1].appendChild(totalRow);
      document.querySelector('.buy-button').classList.remove('disable');
      document.querySelector('.table.table-header').classList.remove('disable');
    } else {
      document.querySelector('.buy-button').classList.add('disable');
      document.querySelector('.table.table-header').classList.add('disable');
      document.querySelector('.modal.first .my-modal').innerHTML = '<h2 class="empty-cart">cart is empty</h2>';
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
