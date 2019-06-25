
class AnimalModel {

  getAnimals(url){
    fetch(url)
    .then((response)=> {
	      return response.json();  
    }).then((json)=> {
       this.buildCards(json);
    })
  }

  buildCards(cards){
    let view = new View();
    let animal = new AnimalFactory();
    cards.forEach((el)=>{
      view.renderCard(animal.create(el.type, el));
    });
  }
}


class View {

  renderCard(card){
    const rowCards = document.querySelector('.ui.special.cards');
    let parentDiv = document.createElement('div');
    let abils = '';
    for(let key in card) {
      if(key != 'price' && key != 'count' && key != 'breed' && key != 'id' && key!= 'img') {
        abils += `<p>${key}: ${card[key]}</p>`
      }

    }
    parentDiv.classList.add('card');
    parentDiv.innerHTML =`<div class="blurring dimmable image ui" data-tooltip="Click me to see description">
                            <div class="ui  dimmer">
                              <div class="content">
                                <div class="center">
                                 <h3>Item description:</h3>
                                 ${abils}
                                </div>
                              </div>
                            </div>
                            <img src='${card.img}'>
                          </div>
                          <div class="content">
                            <p class="header">${card.breed}</p>
                            <div class="meta">
                              <h4>Quantity: ${card.count}</h4>
                            </div>
                          </div>
                          <div class="extra content">
                          <h4>Price: ${card.price}$</h4>
                          </div>
                          <div class="ui bottom attached button">
                          <i class="shopping cart icon"></i>
                             Add to cart
                          </div>
                        </div>`;
    rowCards.appendChild(parentDiv);
    $('.special.cards .image').dimmer({
      on: 'click'
    })
  }
  
}



let run = new AnimalModel();
run.getAnimals('data/animals.json');




class AnimalFactory{
  create (type, obj) {
    if (type === 'bird') {
      return  new Bird(obj)
    } else if (type === 'fish') {
      return  new Fish(obj)
    } else if (type === 'dog') {
      return  new Dog(obj)
    } else if (type === 'cat') {
      return new Cat(obj)
    }  
  }
}

class Animal{
  constructor(obj) {
    this.type = obj.type;
    this.breed = obj.breed;
    this.id = obj.id;
    this.price = obj.price;
    this.count = obj.count;
    this.age = obj.age;
    this.color = obj.color;
    this.isPredator = obj.isPredator;
    this.gender = obj.gender;
    this.weigth = obj.weigth;
    this.img = obj.img
  }
}

class Bird extends Animal {
  constructor(obj) {
    super(obj);
    this.isFly = obj.isFly;
    this.isSpeak = obj.isSpeak;
    this.isSing = obj.isSing;
  }
}

class Fish extends Animal {
  constructor(obj) {
    super(obj);
    this.isFreshWater = obj.isFreshWater;
    this.deepLevel = obj.deepLevel;
  }
}

class Mammals extends Animal {
  constructor(obj) {
    super(obj);
    this.fur = obj.fur;
    this.pedigree = obj.pedigree;
    this.cupping = obj.cupping;
    this.short_sightedness = obj.short_sightedness;
  }
}

class Dog extends Mammals {
  constructor(obj) {
    super(obj);
    this.specialization = obj.specialization;
  }
}

class Cat extends Mammals {
  constructor(obj) {
    super(obj);
    this.isFold = obj.isFold;
  }
}


$('.ui.dropdown')
  .dropdown()
;







// let ru = {
//   true: "да",
//   false: "нет",
//   "type": "тип",
//   "bird": "птица",
//   "fish": "рыба",
//   "cat":  "кот",
//   "dog": "собака",
//   "breed": "порода",
//   "color": "цвет",
//   "count": "количество",
//   "price": "цена",
//   "age": "возраст",
//   "weigth": "вес",
//   "isPredator" : "хищник",
//   "gender":  "пол",
//   "male": "муж",
//   "female": "жен",
//   "fur": "мех",
//   "pedigree": "родословная",
//   "cupping": "купированность",
//   "short_sightedness": "коротколапость",
//   "specialization": "специализация",
//   "hunter":"охотник",
//   "decorative": "декоративная",
//   "isFly": "летает",
//   "isSpeak": "разговаривает",
//   "isSing": "поет",
//   "isFold": "вислоухость",
//   "isFreshWater": "пресновдоность",
//   "deepLevel": "зональность",
//   "special": "special",
//   "Canary": "Канарейка",
// }


// function translate(obj,obj2) {

//   let result = {}

//   for(let key in obj) {
//     for(let key2 in obj2) {
//       if(key2 == key) {
//         result[obj[key]] = obj2[key2];
//       }
//     }
//   }

//   for(let key in obj) {
//     for(let key2 in result) {
//         if(result[key2]==key){
//           result[key2]=obj[key]
//         }
//       }
//     }
// return result
// }


// document.querySelector('.ru').addEventListener('click', ()=>{
//   let model = new AnimalModel();
//   let newdata = data.map(el=>{
//    return el =  translate(ru, el)
//   })
//   model.buildCards(newdata);
// })

