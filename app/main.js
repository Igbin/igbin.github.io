import AnimalController  from './controller.js';
import AnimalModel  from './model.js';

export default class Storage {
  static data = [];
  static vocabluary = {};
  static lang  = 'en';

  static init() {
    AnimalController.init();
    AnimalModel.getVocabluary();
  }
}


document.addEventListener('DOMContentLoaded', Storage.init);