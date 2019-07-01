import Storage from './main.js';
import AnimalModel from './model.js';
import {View, CartView} from './view.js';
import CartModel from './cartmodel.js';
import CartController from './cartcontroller.js';


export default class AnimalController {
  

  static init() {
    AnimalModel.getAnimals(this);
  }


  static buildCards(cards){
    // let animal = new AnimalFactory();
    cards.forEach((el)=>{
      // View.renderCard(animal.create(el.type, el));
    View.renderCard(el);
    });
  }

  static tranlateData(obj){
    let newObj  = {};
 
    for(let key in obj){
      if(key == 'id' || key == 'img') {
        newObj[key] = obj[key];
      } else {
        newObj[this.convertToLang(key)] = this.convertToLang(obj[key]);
      }
    }
    return newObj;
  } 

  static convertToLang(info){
    if(!Array.isArray(info)) {
      return (isNaN(1 * info))? Storage.vocabulary[info][Storage.lang]: info;
    } else {
      return info.map(el =>{
        return el = Storage.vocabulary[el][Storage.lang];
      })
    }
  }

  
  static addToCart() {

    CartModel.cart[this.dataset.id] += 1; 
    localStorage.cart = JSON.stringify(CartModel.cart);

    Storage.data.forEach(el=>{
        if(el.id == this.dataset.id) {
           el.count -= 1;
        }

          // if(CartModel.cart[key] !=0) {
          //   CartView.renderCard(el)
          // }
        
        // Array.from(document.querySelectorAll('div[dataset')).forEach(div => {
        //   if(div.getAttribute('dataset') == this.dataset.id) {
        //     div.innerHTML = '';
        //   }
        // })

        // View.renderCard(el); 
      
    });
    localStorage.data = JSON.stringify(Storage.data);
    document.querySelector('.ui.special.cards').innerHTML = '';
    AnimalController.buildCards(Storage.data);
    CartView.refreshCart();
  }


  static listener(){
    Array.from(document.querySelectorAll('.lang')).forEach(el => {
      el.addEventListener('click', (e) => {
      Storage.lang = event.target.dataset.lang;
      document.querySelector('.lang-icon').innerHTML = Storage.lang;
      document.querySelector('.ui.special.cards').innerHTML = '';
      AnimalController.buildCards(Storage.data); 
      })
    });

    document.querySelector('.myModale').addEventListener('click', CartController.buildCarts);
    document.querySelector('.sign-in').addEventListener('click', this.signIn);
    document.querySelector('.sign-out').addEventListener('click', this.signOut);

    const addListenerMulti = (el, s, fn) => {
      s.split(' ').forEach(e => el.addEventListener(e, fn, false));
    };

    addListenerMulti(document.querySelector('.ui.search'), 'click keyup', () =>{
        setTimeout(()=>{
          Array.from(document.querySelectorAll('a.result')).forEach(el => {
            el.addEventListener('click', this.searchFilter)
          }); 
          Array.from(document.querySelectorAll('div.name')).forEach(el => {
            el.addEventListener('click', this.searchFilter)
          }); 
        }, 500)
    });


    $('.ui.dropdown').dropdown();
  }

  
  static signIn() {
    $('.intro').transition('fade down');

    Array.from(document.querySelectorAll('.sign-in, .mini-cart, .ui.search, .items')).forEach((el)=>{
      el.classList.toggle('disable');
    })

    let searchData = [];
    Storage.data.forEach(el=>{   
      let searchObj = {}; 
      searchObj.category = el.type;
      searchObj.title = el.breed;
      searchData.push(searchObj)
    });

    $('.ui.search').search({
      type: 'category',
      source: searchData
    });
  }

  static signOut() {
    $('.ui.basic.test.modal').modal({
      closable  : true,
      blurring: true,
      onDeny    : function(){
       $('.ui.mini.test.modal').modal('toggle')
      },
      onApprove : function() {
        AnimalController.clear();
      }
    }).modal('show');
  }

  static clear() {
    localStorage.removeItem('cart');
    localStorage.removeItem('data');
    document.querySelector('.ui.special.cards').innerHTML = '';
    Storage.init();
  }

  static searchFilter() {
    let tempdata = [];

    Storage.data.forEach(el=>{
      if(this.tagName === 'A') {
        if(el.breed == this.innerText) {
          document.querySelector('.ui.special.cards').innerHTML = '';
          View.renderCard(el);
        }
      } else {
        if(el.type == this.innerText) {
          document.querySelector('.ui.special.cards').innerHTML = '';
          tempdata.push(el);
        }
      }
    });   
    AnimalController.buildCards(tempdata);
  }  

  static buy() {
    console.log('sdsd');
    
  }

} 
