import AnimalModel from './model.js';
import {View, CartView} from './view.js';


export default class AnimalController {

  constructor() {
    this.model = new AnimalModel(this);
    this.view = new View(this);
    this.cartView = new CartView(this);
  }
  
  init() {
    this.model.getVocabluary();
    this.model.getAnimals();
    this.view.addListeners();
  }


  buildCards(cards){
    // let animal = new AnimalFactory();
    cards.forEach((el)=>{
      // View.renderCard(animal.create(el.type, el));
      this.view.renderCard(el);
    });
  }


  renderCart() {
    let items = [];
    let total = 0;

    this.model.data.forEach(el=>{
      if(this.model.cart[el.id] != 0) {
        items.push(el);
        total = total + el.price * this.model.cart[el.id];
       }
    });
    this.cartView.buildCarts(items, total);
  }


  refreshCartIcon() {
    this.cartView.refreshCartIcon(this.model.cart);
  }


  addToCart(id) {
    this.model.cart[id] += 1; 
    localStorage.cart = JSON.stringify(this.model.cart);
    this.model.data.forEach(el=>{
      if(el.id == id) {
        el.count--;
        localStorage.data = JSON.stringify(this.model.data);  
        this.view.refreshQuantity(id, el.count);
        this.refreshCartIcon();
      }
    });
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
        this.view.refreshQuantity(el.id, el.count)
      }
    });
    
    localStorage.cart = JSON.stringify(this.model.cart);
    localStorage.data = JSON.stringify(this.model.data);

    document.querySelector('.my-modal').innerHTML = '';
    this.renderCart();
    this.refreshCartIcon(this.model.cart);
  }


  changeLang(language) {
    this.model.lang = language;
    document.querySelector('.ui.special.cards').innerHTML = '';
    this.buildCards(this.model.data); 
    document.querySelector('span.lang-icon').innerHTML = language;
    this.prepareSearchData();
  }


  convertToLang(word){
    if(!Array.isArray(word)) {
      return (isNaN(1 * word))? this.model.vocabulary[word][this.model.lang]: word;
    } else {
      return word.map(el =>{
        return el = this.model.vocabulary[el][this.model.lang];
      });
    }
  }


  prepareSearchData() {
    let searchData = [];
    this.model.dataForSearch.forEach(el=>{   
      let searchObj = {}; 
      searchObj.category = this.convertToLang(el.type);
      searchObj.title = this.convertToLang(el.breed);
      searchData.push(searchObj)
    });

    $('.ui.search').search({
      type: 'category',
      source: searchData
    });
  }


  searchFilter() {
    let filterdata = [];
    this.model.dataForSearch.forEach(el=>{
      if(event.target.classList.contains('title') || event.target.tagName === 'A') {
        if(this.convertToLang(el.breed) == event.target.innerText) {
          document.querySelector('.ui.special.cards').innerHTML = '';
          this.view.renderCard(el);
        }
      } else {
        if(this.convertToLang(el.type) == event.target.innerText) {
          document.querySelector('.ui.special.cards').innerHTML = '';
          filterdata.push(el);
        }
      }
    });   
    this.buildCards(filterdata);
  }  


   filter() {

    document.querySelector('.prompt').value = '';

    if(this.name == 'all' && this.checked == true) {
      document.querySelector('.ui.special.cards').innerHTML = '';
      this.buildCards(this.model.data); 
      Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(el => {
        el.name != 'all' ? el.checked = false : false;
      }); 
    } else {
    this.model.data.forEach(el=>{
      document.querySelector('input[name=all]').checked = false;
      for(let i = 0; i <  document.querySelectorAll('input:checked').length; i++) {
        if(el.type ==  document.querySelectorAll('input:checked')[i].name) {
          tempdata.push(el);
        }
      }
    });
      document.querySelector('.ui.special.cards').innerHTML = '';
      AnimalController.buildCards(tempdata); 
    }
    return tempdata;
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
    document.querySelector('.ui.special.cards').innerHTML = '';
    this.model.getAnimals();
    document.querySelector('.prompt').value = '';
    this.buildCards(this.model.data);
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
    this.buildCards(this.model.data); 

  }

} 
