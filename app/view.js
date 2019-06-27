import AnimalController  from './controller.js';
import Storage from './main.js';

export default class View {

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

    for(let key in card) {
      if(key != 'price' && key != 'count' && key != 'breed' && key != 'id' && key!= 'img'
        && key != 'цена' && key != 'количество' && key != 'порода' && key != 'цiна' && key != 'кiлькiсть') {
        abils += `<p>${key}:${card[key]}</p>`
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
                            <img src='${card.img}'>
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
                          <div class="ui bottom attached button cart-button" data-id ="${card.id}">
                          <i class="add  icon"></i>
                          <i class="shopping cart icon"></i>
                          </div>
                        </div>`;
    rowCards.appendChild(parentDiv);
    $('.special.cards .image').dimmer({
      on: 'click'
    })
  }
  
}