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
    return store.items.filter(item => item.id === id);
  };

  const expandBookmark = function (id) {
    return this.findById(id);
  };

  const filterBookmarks = function (num) {
    return store.sortNumber = Number(num);
  };

  const showError = function (message) {
    return store.errorMessage = message;
  };

  return {
    addItem,
    items: [],
    isAdding: false,
    minRating: 0,
    errorMessage: '',
    isExpanded: false,
    sortNumber: null,
    toggleAddItem,
    findAndDelete,
    findById,
    expandBookmark,
    filterBookmarks,
    showError,
  };
})();