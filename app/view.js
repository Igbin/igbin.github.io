import AnimalController  from './controller.js';
import CartController  from './cartcontroller.js';
import Storage from './main.js';
import CartModel  from './cartmodel.js';

export  class View {

  static renderCard(card){
    const rowCards = document.querySelector('.ui.special.cards');
    let parentDiv = document.createElement('div');
    let abils = '';


    card = Storage.lang != 'en' ? AnimalController.tranlateData(card) : card;
    let breed = Storage.lang == 'en' ? card.breed : card.порода;

    let count = Storage.lang == 'en' ? `Quantity: ${card.count}` :
                Storage.lang == 'ru' ? `Количество: ${card.количество}` :
                                       `Кiлькicть: ${card.кiлькiсть}`;

    let price = Storage.lang == 'en' ? `Price: ${card.price}$` :
                Storage.lang == 'ru' ? `Цена: ${card.цена}$` :
                               `Цiна: ${card.цiна}$`;

  
    let disabled = parseInt(count.replace(/\D+/g,"")) == 0 ? 'disabled' : '';

    for(let key in card) {
      if(key != 'price' && key != 'count' && key != 'breed' && key != 'id' && key!= 'img'
        && key != 'цена' && key != 'количество' && key != 'порода' && key != 'цiна' && key != 'кiлькiсть') {
        abils += `<p>${key}:  ${card[key]}</p>`
      }
    }
    parentDiv.classList.add('card');
    parentDiv.setAttribute('dataset', card.id)
    parentDiv.innerHTML =`<div class="blurring dimmable image ui" data-tooltip="Click me to see description">
                            <div class="ui  dimmer">
                              <div class="content">
                                 ${abils}
                              </div>
                            </div>
                            <img class="ui image ${disabled}" src='${card.img}'>
                          </div>
                          <div class="content">
                            <p class="header">${breed}</p>
                            <div class="meta">
                              <h4>${count}</h4>
                            </div>
                          </div>
                          <div class="extra content">
                          <h4>${price}</h4>
                          </div>
                          <div class="ui bottom attached animated fade button cart-button ${disabled}" data-id ="${card.id}">
                          <div class ="visible content">
                            <i class="add icon"></i>
                            <i class="shopping cart icon"></i>
                          </div>
                          <div class="hidden content">Add to Cart</div>  
                          </div>
                        </div>`;
    rowCards.appendChild(parentDiv)
    parentDiv.querySelector('.cart-button').addEventListener('click', AnimalController.addToCart);
    $('.special.cards .image').dimmer({
      on: 'click'
    })
  } 


}

export class CartView {

  static renderCard(card){
    const modal = document.querySelector('.my-modal');
    let parentDiv = document.createElement('div');
    let props = '';
  
    card = Storage.lang != 'en' ? AnimalController.tranlateData(card) : card;

    let breed = Storage.lang == 'en' ? card.breed : card.порода;
    let type =  Storage.lang == 'en' ?  card.type : card.тип;
    let count = Storage.lang == 'en' ? `Quantity: ${card.count}` :
                Storage.lang == 'ru' ? `Количество: ${card.количество}` :
                                       `Кiлькicть: ${card.кiлькiсть}`;
    let price = Storage.lang == 'en' ? card.price :
                Storage.lang == 'ru' ? card.цена :
                                       card.цiна;
    let disabledPlus = parseInt(count.replace(/\D+/g,"")) == 0 ? 'disabled' : '';
    let icon = CartModel.cart[card.id] == 1 ? 'trash' : 'minus';


    props+= ` <tr><td class="cart-item"><img src='${card.img}' class="ui tiny image"><h3>${type} ${breed}</h3></td>
                  <td class="center aligned cart-quant"> <i class="plus icon large ${disabledPlus}" data-id ="${card.id}"></i><span> ${CartModel.cart[card.id]} </span> <i class="${icon} icon large" data-id ="${card.id}"></i></td> 
                  <td class="center aligned cart-sum"> <h3>${price * CartModel.cart[card.id]} $</h3></td>
              </tr>`

    parentDiv.classList.add('cart-modal');
    parentDiv.innerHTML =`<table class="ui celled table">              
                              ${props}
                         </table>`;
    modal.appendChild(parentDiv);
    Array.from(parentDiv.querySelectorAll('.icon')).forEach(el=>{
        el.addEventListener('click', (e)=>{
           CartController.changeCount(event.target.classList[0]);
        }) 
    })
  }
  static refreshCart() {
    let sum = Object.values(CartModel.cart).reduce((acc, cur) => +acc + +cur);
    document.querySelector('.cart-mini').innerHTML = sum;
  }
}
