
let data = [];
let vocabulary = {};
let lang = 'en';

class AnimalModel {

  getAnimals(url){
    fetch(url)
    .then((response)=> {
	      return response.json();  
    }).then((json)=> {
       data = json;
       this.buildCards(json);
    })
  }

   getVocabluary(){
    fetch('data/animalsRU.json')
    .then((response)=> {
        return response.json();  
    }).then((json)=> {
      vocabulary = json[0]
    })
  }


  buildCards(cards){
    // let animal = new AnimalFactory();
    cards.forEach((el)=>{
      // View.renderCard(animal.create(el.type, el));
    View.renderCard(el);
    });
  }
}


class View {

  static renderCard(card){
    const rowCards = document.querySelector('.ui.special.cards');
    let parentDiv = document.createElement('div');
    let abils = '';

    card = lang != 'en' ? Controller.tranlateData(card) : card;

    let breed = lang == 'en' ? card.breed : card.порода;

    let count = lang == 'en' ? `Quantity: ${card.count}` :
                lang == 'ru' ? `Количество: ${card.количество}` :
                               `Кiлькicть: ${card.кiлькiсть}`;

    let price = lang == 'en' ? `Price: ${card.price}$` :
                lang == 'ru' ? `Цена: ${card.цена}$` :
                               `Цiна: ${card.цiна}$`;

    for(let key in card) {
      if(key != 'price' && key != 'count' && key != 'breed' && key != 'id' && key!= 'img'
        && key != 'цена' && key != 'количество' && key != 'порода' && key != 'цiна' && key != 'кiлькiсть') {
        abils += `<p>${key}:${card[key]}</p>`
      }
    }
    parentDiv.classList.add('card');
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
                          <div class="ui bottom attached button">
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


class Controller {
  
  static tranlateData(obj){
    let newObj  = {};
    
    for(let key in obj){
      if(key == 'id' || key == 'img') {
        newObj[key] = obj[key];
      } else {
        newObj[Controller.convertToLang(key)] = Controller.convertToLang(obj[key]);
      }
    }
    return newObj
  } 


  static convertToLang(info){
    if(!Array.isArray(info)) {
      return (isNaN(1 * info))? vocabulary[info][lang]: info;
    } else {
      let newArr = info.map(el =>{
      return el = vocabulary[el][lang]
      })
    return newArr;
    }
  }

  static init(){
    Array.from(document.querySelectorAll('.lang')).forEach(el => {
    el.addEventListener('click', (e) => {
    lang = event.target.dataset.lang;
    document.querySelector('.lang-icon').innerHTML = lang;
    let model = new AnimalModel();
    document.querySelector('.ui.special.cards').innerHTML = '';
    model.buildCards(data);
     })
  });

  $('.ui.dropdown')
  .dropdown();
  }
} 



let run = new AnimalModel();
run.getAnimals('data/animals.json');
run.getVocabluary();
Controller.init()



 

// class AnimalFactory{
//   create (type, obj) {
//     if (type === 'bird') {
//       return  new Bird(obj)
//     } else if (type === 'fish') {
//       return  new Fish(obj)
//     } else if (type === 'dog') {
//       return  new Dog(obj)
//     } else if (type === 'cat') {
//       return new Cat(obj)
//     }  
//   }
// }

// class Animal{
//   constructor(obj) {
//     this.type = obj.type;
//     this.breed = obj.breed;
//     this.id = obj.id;
//     this.price = obj.price;
//     this.count = obj.count;
//     this.age = obj.age;
//     this.color = obj.color;
//     this.isPredator = obj.isPredator;
//     this.gender = obj.gender;
//     this.weigth = obj.weigth;
//     this.img = obj.img
//   }
// }

// class Bird extends Animal {
//   constructor(obj) {
//     super(obj);
//     this.isFly = obj.isFly;
//     this.isSpeak = obj.isSpeak;
//     this.isSing = obj.isSing;
//   }
// }

// class Fish extends Animal {
//   constructor(obj) {
//     super(obj);
//     this.isFreshWater = obj.isFreshWater;
//     this.deepLevel = obj.deepLevel;
//   }
// }

// class Mammals extends Animal {
//   constructor(obj) {
//     super(obj);
//     this.fur = obj.fur;
//     this.pedigree = obj.pedigree;
//     this.cupping = obj.cupping;
//     this.short_sightedness = obj.short_sightedness;
//   }
// }

// class Dog extends Mammals {
//   constructor(obj) {
//     super(obj);
//     this.specialization = obj.specialization;
//   }
// }

// class Cat extends Mammals {
//   constructor(obj) {
//     super(obj);
//     this.isFold = obj.isFold;
//   }
// }




