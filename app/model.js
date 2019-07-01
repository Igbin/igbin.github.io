import Storage from './main.js';
import AnimalController  from './controller.js';
import CartModel  from './cartmodel.js';

export default class AnimalModel {

  static getAnimals(controller){

    if(localStorage.getItem("data")) {
       Storage.data =  JSON.parse(localStorage.getItem("data"));
       controller.buildCards(Storage.data);
       AnimalController.listener();
       CartModel.init();
    } else {
      fetch('data/animals.json')
      .then((response)=> {
	      return response.json();  
      }).then((json)=> {
        localStorage.setItem("data", JSON.stringify(json));
        Storage.data = json;
        controller.buildCards(json);
      }).then(()=>{
        AnimalController.listener()
      }).then(()=>{
        CartModel.init();
      })
    }
  }
  
  static getVocabluary(){
    fetch('data/animalsRU.json')
    .then((response)=> {
        return response.json();  
    }).then((json)=> {
      Storage.vocabulary = json[0]
    })
  }

}



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