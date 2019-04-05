'use strict';

const store = (function () {

  const addItem = function (item) {
    const obj = Object.assign(item, { isExpanded: false });
    this.items.push(obj);
  };

  const toggleAddItem = function(){
    this.isAdding = !this.isAdding;
  };

  const findAndDelete = function (id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findById = function (id) {
    console.log(store.items);
    return store.items.filter(item => item.id === id);
  };

  const expandBookmark = function (id) {
    return this.findById(id);
  };

  return {
    addItem,
    items: [],
    isAdding: false,
    minRating: 0,
    isExpanded: false,
    toggleAddItem,
    findAndDelete,
    findById,
    expandBookmark,
  };
})();