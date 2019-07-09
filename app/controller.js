import AnimalModel from './model.js';
import {View} from './view.js';
import CartView from './cartview.js';


export default class AnimalController {

  constructor() {
    this.model = new AnimalModel(this);
    this.view = new View(this);
    this.cartView = new CartView(this);
    this.init();
  }
  
  init() {
    this.model.getAnimals();
    this.view.addListeners();
    this.model.prepareSearchData();
    this.renderFilters();
  }


  buildCards(cards, vocabulary, lang){
    cards.forEach((el)=>{
      this.view.renderCard(el, vocabulary, lang);
    });
  }


  renderCart() {
    let items = [];
    let total = 0;

    this.model.getData().forEach(el=>{
      if(this.model.getCart()[el.id] != 0) {
        items.push(el);
        total = total + el.price * this.model.getCart()[el.id];
       }
    });
    this.cartView.buildCarts(items, total, this.model.vocabulary, this.model.lang);
  }


  refreshCartIcon() {
    this.cartView.refreshCartIcon(this.model.getCart());
  }


  addToCart(id) {
    this.model.addToCart(id);
    this.model.getData().forEach(el=>{
      if(el.id == id) 
      this.view.refreshQuantity(id, el.count, this.model.vocabulary, this.model.lang);
    });
    this.refreshCartIcon();
  }


  changeCartOrders(direction) {
    let dir = direction == 'plus' ? -1 : 1;

    this.model.data.forEach(el=>{
      if(el.id == event.target.dataset.id){
        if(direction == 'plus' && el.count == 0) {
          return;
        }
        el.count = el.count + dir;
        this.model.cart[el.id] = this.model.cart[el.id] - dir;
        this.view.refreshQuantity(el.id, el.count, this.model.vocabulary, this.model.lang)
      }
    });
    
    localStorage.cart = JSON.stringify(this.model.cart);
    localStorage.data = JSON.stringify(this.model.data);

    document.querySelector('.my-modal').innerHTML = '';
    this.renderCart();
    this.refreshCartIcon();
  }



  changeLang(language) {
    this.model.lang = language;
    document.querySelector('.ui.special.cards').innerHTML = '';
    this.buildCards(this.model.dataForSearch, this.model.vocabulary, this.model.lang); 
    document.querySelector('span.lang-icon').innerHTML = language;
    this.model.prepareSearchData();
    this.renderFilters();
    localStorage.setItem('lang', this.model.lang)
  }



  searchFilter() {
    let filterdata = [];
    this.model.dataForSearch.forEach(el=>{
      if(event.target.classList.contains('title') || event.target.tagName === 'A') {
        if(this.model.vocabulary[el.breed][this.model.lang] == event.target.innerText) {
          document.querySelector('.ui.special.cards').innerHTML = '';
          this.view.renderCard(el, this.model.vocabulary, this.model.lang);
        }
      } else {
        if(this.model.vocabulary[el.type][this.model.lang] == event.target.innerText) {
          document.querySelector('.ui.special.cards').innerHTML = '';
          filterdata.push(el);
        }
      }
    });
    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(el => {
      el.checked = false;
    });   
    this.buildCards(filterdata, this.model.vocabulary, this.model.lang);
  }  


   filter() {
    let tempdata = [];
    document.querySelector('.ui.special.cards').innerHTML = '';
    document.querySelector('.prompt').value = '';
    Array.from(document.querySelectorAll('input:checked')).forEach(input => {
      this.model.data.forEach(el=>{
        if(el.type == input.value) {
          tempdata.push(el);
          this.view.renderCard(el, this.model.vocabulary, this.model.lang);
        }
      });
    });
    this.model.dataForSearch = tempdata;
    this.model.prepareSearchData();

    if(document.querySelectorAll('input:checked').length == 0) {
      this.model.dataForSearch = this.model.getData();
      this.buildCards(this.model.getData(), this.model.vocabulary, this.model.lang);
      this.model.prepareSearchData();
    }
  }


  renderFilters() {
    let types = [];
    this.model.data.forEach(el=>{
      if(!types.includes(el.type)) {
        types.push(el.type);
      }
    });
    this.view.renderFilters(types, this.model.vocabulary, this.model.lang);
  }


  showHistory(){
    this.view.renderHistory(this.model.history)
    $('.ui.longer.modal.history').modal('show');
  }

  
  signOut() {
    $('.ui.basic.test.modal').modal({
      closable  : true,
      blurring: true,
      onDeny    : function(){
       $('.ui.mini.test.modal').modal('toggle')
      },
      onApprove : () => {
        this.clear();
      }
    }).modal('show');
  }


  clear() {
    localStorage.removeItem('cart');
    localStorage.removeItem('data');
    localStorage.removeItem('history');
    localStorage.removeItem('vocabulary');
    document.querySelector('.ui.special.cards').innerHTML = '';
    this.model.getAnimals();
    document.querySelector('.prompt').value = '';
    this.buildCards(this.model.data, this.model.vocabulary, this.model.lang);
    this.refreshCartIcon();
  }

  
   buy() {
    let toHistory = {};
    toHistory.orders = this.cartView.order;
    toHistory.name = document.querySelector('form')[0].value;
    toHistory.phone = document.querySelector('form')[1].value;
    toHistory.email = document.querySelector('form')[2].value;
    toHistory.date = `${new Date().getDate()}, ${new Date().getMonth()}, ${new Date().getFullYear()},${new Date().toLocaleTimeString()}`

    this.model.history.push(toHistory);
    localStorage.history = JSON.stringify(this.model.history);
    localStorage.data = JSON.stringify(this.model.data);
    localStorage.removeItem('cart');
    document.querySelector('.ui.special.cards').innerHTML = '';
    this.buildCards(this.model.data, this.model.vocabulary, this.model.lang); 
    this.refreshCartIcon();
  }

} 
