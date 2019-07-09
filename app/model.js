
export default class AnimalModel {

  constructor(controller) {
    this.data = [];
    this.vocabulary = localStorage.getItem("vocabulary") ?  JSON.parse(localStorage.getItem("vocabulary"))[0] : {};
    this.lang = localStorage.getItem("lang") ?  JSON.parse(localStorage.getItem("lang")) : 'en';
    this.cart = {};
    this.dataForSearch = [];
    this.history = localStorage.getItem("history") ?  JSON.parse(localStorage.getItem("history")) : [];
    this.controller = controller;
    this.animalFactory = new AnimalFactory();
  }


   getAnimals(){
    if(localStorage.getItem("data")) {
       this.data =  JSON.parse(localStorage.getItem("data"));
       this.getVocabluary();
       this.controller.buildCards(this.data, this.vocabulary, this.lang);
       this.initCart();
       this.dataForSearch = this.data; 
    } else {
      fetch('data/animals.json')
      .then((response)=> {
          this.getVocabluary();
	        return response.json();  
      }).then((json)=> {
        this.data = this.animalFactory.createData(json);
        localStorage.setItem("data", JSON.stringify(this.data));
        this.data = json;
        this.dataForSearch =  this.data;
        this.controller.buildCards(this.data, this.vocabulary, this.lang);
      }).then(()=>{
        this.initCart();
      });
    } 
  }
  

  initCart() {
    if(localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      this.data.forEach(el=>{
          this.cart[el.id] = 0;
      });
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    this.controller.refreshCartIcon();
  }
  

   getVocabluary(){
    if(localStorage.getItem("vocabulary")) {
       this.vocabulary =  JSON.parse(localStorage.getItem("vocabulary"));
    } else {
      fetch('data/animalsRU.json')
      .then((response)=> {
        return response.json();  
      }).then((json)=> {
        this.vocabulary = json[0];
        localStorage.setItem("vocabulary", JSON.stringify(json[0]));
      });
    }
  }


  prepareSearchData() {
    let searchData = [];
    this.dataForSearch.forEach(el=>{   
      let searchObj = {}; 
      searchObj.category = this.vocabulary[el.type][this.lang];
      searchObj.title = this.vocabulary[el.breed][this.lang];
      searchData.push(searchObj)
    });

    $('.ui.search').search({
      type: 'category',
      source: searchData
    });
  }

  addToCart(id){
    this.cart[id] += 1; 
    localStorage.cart = JSON.stringify(this.cart);
    this.data.forEach(el=>{
      if(el.id == id) {
        el.count--;
        localStorage.data = JSON.stringify(this.data); 
        return el.count;
      }  
    });  
  }

  getData() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

}


class AnimalFactory{

  createData(array) {
   let data =  array.map(el=>{
      return el = this.createObj(el.type, el)
    });
    return data;
  }

   createObj (type, obj) {
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