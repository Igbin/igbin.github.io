import Storage from './main.js';
import AnimalModel from './model.js';
import View from './view.js';


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

    Array.from(document.querySelectorAll('.cart-button')).forEach(el => {
      el.addEventListener('click', this.addToCart);     
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
      let newArr = info.map(el =>{
      return el = Storage.vocabulary[el][Storage.lang];
      })
    return newArr;
    }
  }

  
  static addToCart() {
    Storage.data.forEach(el=>{

        if(el.id == this.dataset.id) {
          el.count--;
        
        Array.from(document.querySelectorAll('div[dataset')).forEach(div => {
          if(div.getAttribute('dataset') == this.dataset.id) {
            div.innerHTML = '';
          }
        })

        View.renderCard(el);
      }
    })
    // document.querySelector('.ui.special.cards').innerHTML = '';
    // AnimalController.buildCards(Storage.data);


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




  $('.ui.dropdown')
  .dropdown();
  }
} 

