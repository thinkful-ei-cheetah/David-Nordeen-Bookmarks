'use strict';

const store = (function () {

  const addItem = function (item) {
    this.items.push(item);
  };

  const toggleAddItem = function(){
    this.isAdding = !this.isAdding;
  };

  const findAndDelete = function (id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    addItem,
    items: [],
    isAdding: false,
    minRating: 0,
    toggleAddItem,
    findAndDelete,
  };
})();